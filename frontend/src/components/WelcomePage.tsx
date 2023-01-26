import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CryptoJS from "crypto-js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClipLoader } from "react-spinners";

type FormValues = {
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Podaj prawidłowy adres email!")
    .required("Podaj adres email!"),
  password: yup.string().required("Podaj hasło!"),
});

const WelcomePage = () => {
  //loading state
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    setIsLoading(true);

    const password = CryptoJS.SHA256(data.password).toString();

    setTimeout(() => {
      fetch("http://localhost:1337/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              console.log(data);
              setIsLoading(false);
            });
            setIsLoading(false);
          }
          if (response.status === 401) {
            setError("email", {
              type: "manual",
              message: "Nieprawidłowy email lub hasło!",
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }, 1000);
  };

  return (
    <div className="flex flex-row flex-end h-screen w-screen">
      <div id="spy" className="flex h-full w-1/2" />
      <div className="flex flex-col flex-end justify-center items-center h-full w-1/2 gap-2">
        <h1 className="text-7xl h-1/4">TAJNIACY</h1>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            className="flex flex-col justify-center items-center gap-10"
          >
            <div className="flex justify-center w-full gap-2">
              <div className="flex flex-col items-center gap-2">
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

              <div className="flex flex-col items-center gap-2">
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
            </div>
            {isLoading && <ClipLoader color="rgba(157, 23, 77, 1)" />}
            <button
              type="submit"
              className=" w-24 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border  rounded shadow"
            >
              zaloguj
            </button>
          </form>
        </div>
        <div>
          <a
            href="/register"
            className="inline-block align-baseline font-bold text-m text-pink-500 hover:text-pink-800"
          >
            zarejestruj się
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
