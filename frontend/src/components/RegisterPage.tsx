import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CryptoJS from "crypto-js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordStrengthBar from "react-password-strength-bar";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

type FormValues = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const registerSchema = yup.object().shape({
  nickname: yup
    .string()
    .required("Podaj nick!")
    .min(3, "Nick musi mieć przynajmniej 3 znaki!")
    .max(15, "Nick może mieć maksymalnie 15 znaków!"),
  email: yup
    .string()
    .email("Podaj prawidłowy adres email!")
    .required("Podaj adres email!"),
  password: yup.string().required("podaj hasło!").min(4, "Hasło za krótkie!"),
  passwordConfirmation: yup.string().required("potwierdź hasło!"),
});

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    setIsLoading(true);
    if (data.password !== data.passwordConfirmation) {
      setError("passwordConfirmation", {
        type: "manual",
        message: "Hasła nie są takie same!",
      });
      setIsLoading(false);
      return;
    }

    const password = CryptoJS.SHA256(data.password).toString();
    const passwordConfirmation = CryptoJS.SHA256(
      data.passwordConfirmation
    ).toString();
    fetch("http://localhost:1337/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: password,
        passwordConfirmation: passwordConfirmation,
        nickname: data.nickname,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log(
            "zarejstrowano użytkownika " +
              "\n nickname: " +
              data.nickname +
              "\n email: " +
              data.email
          );
        });

        setTimeout(() => {
          navigate("/");
          setIsLoading(false);
        }, 2000);
      }
      if (response.status === 409) {
        setTimeout(() => {
          setError("email", {
            type: "manual",
            message: "Użytkownik o podanym adresie email już istnieje!",
          });
          setIsLoading(false);
        }, 2000);
      }
    });
  };

  const password = watch("password");

  return (
    <div className="flex flex-row flex-end h-screen w-screen">
      <div id="spy" className="flex h-full w-1/2" />
      <div className="flex flex-col flex-end justify-center items-center h-full w-1/2 gap-10">
        <h1 className="text-7xl">TAJNIACY</h1>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            className="flex flex-col gap-2 pl-28"
          >
            <div className="flex flex-row items-center gap-2">
              <input
                {...register("nickname")}
                placeholder="nickname"
                autoComplete="off"
                className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
              />
              {errors.nickname && (
                <span className="text-pink-900 font-bold">
                  {errors.nickname.message}
                </span>
              )}
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                {...register("email")}
                placeholder="email"
                className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
              />
              {errors.email && (
                <span className="text-pink-900 font-bold">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-row items-center gap-2">
              <input
                {...register("password")}
                type="password"
                placeholder="hasło"
                className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
              />
              {errors.password && (
                <span className="text-pink-900 font-bold">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                {...register("passwordConfirmation")}
                type="password"
                placeholder="hasło"
                className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
              />
              {errors.passwordConfirmation && (
                <span className="text-pink-900 font-bold">
                  {errors.passwordConfirmation.message}
                </span>
              )}
            </div>
            <PasswordStrengthBar password={password} className="max-w-xs" />
            <div className="flex gap-6">
              <button
                type="submit"
                className="w-32 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
              >
                zarejestruj
              </button>
              {isLoading && <ClipLoader color="rgba(157, 23, 77, 1)" />}
              <a
                href="/"
                className="flex items-center align-baseline font-bold text-m text-pink-500 hover:text-pink-800 "
              >
                zaloguj się
              </a>
            </div>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default RegisterPage;
