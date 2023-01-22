import React, { FC } from "react";
import { Resolver, useForm, SubmitHandler } from "react-hook-form";
import sha256 from "fast-sha256";
import nacl from "tweetnacl-util";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

const WelcomePage: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    const password = sha256(nacl.decodeUTF8(data.password));
    alert(`email: ${data.email} password: ${password} `);
  };

  return (
    <div className="flex flex-row flex-end h-screen w-screen">
      <div id="spy" className="flex h-full w-1/2" />
      <div className="flex flex-col flex-end justify-center items-center h-full w-1/2 gap-2">
        <h1 className="text-7xl h-1/4">TAJNIACY</h1>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            className="flex flex-col justify-center items-center gap-2"
          >
            <div className="flex justify-center w-full gap-10">
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

            <button
              type="submit"
              className=" w-24 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border  rounded shadow"
            >
              zaloguj
            </button>
          </form>
        </div>
        <div>
          <button className="inline-block align-baseline font-bold text-m text-pink-500 hover:text-pink-800">
            zarejestruj się
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
