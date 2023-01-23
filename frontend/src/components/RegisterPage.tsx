import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import sha256 from "fast-sha256";
import nacl from "tweetnacl-util";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordStrengthBar from "react-password-strength-bar";

type FormValues = {
  nickname: string;
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
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
});

const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
    },
  });

  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    const password = sha256(nacl.decodeUTF8(data.password));
    alert(
      `nickname: ${data.email} email: ${data.email} password: ${password} `
    );
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
            <PasswordStrengthBar password={password} className="max-w-xs" />
            <div className="flex gap-6">
              <button
                type="submit"
                className="w-32 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
              >
                zarejestruj
              </button>
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
