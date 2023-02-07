import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import CryptoJS from "crypto-js";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordStrengthBar from "react-password-strength-bar";
import Cookie from "js-cookie";

type FormValues = {
  password: string;
  passwordConfirmation: string;
};

const registerSchema = yup.object().shape({
  password: yup.string().required("podaj hasło!").min(4, "Hasło za krótkie!"),
  passwordConfirmation: yup.string().required("potwierdź hasło!"),
});

type Props = {
  nickname: string;
};

const ChangePassword = ({ nickname }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      password: "",
    },
  });

  const [Status, setStatus] = useState("");
  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    const password = CryptoJS.SHA256(data.password).toString();
    const passwordConfirmation = CryptoJS.SHA256(
      data.passwordConfirmation
    ).toString();
    // CRUD 9 - PUT -  Change password
    fetch("http://localhost:1337/api/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        newPassword: password,
        passwordConfirmation: passwordConfirmation,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log("zmieniono hasło użytkownika!");
        setError("password", {
          type: "manual",
          message: "Hasło zostało zmienione!",
        });
      }
    });
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="flex flex-col gap-2 pl-28"
    >
      <div className="flex flex-row items-center gap-2">
        <input
          {...register("password")}
          type="password"
          placeholder="nowe hasło"
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
          placeholder=" potwierdź hasło"
          className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
        />
        {errors.passwordConfirmation && (
          <span className="text-pink-900 font-bold">
            {errors.passwordConfirmation.message}
          </span>
        )}
      </div>
      <PasswordStrengthBar password={password} className="max-w-xs" />
      <div className="flex gap-5">
        <button
          type="submit"
          className="w-32 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
        >
          zmień
        </button>

        <a
          href="/profile/me"
          className="flex items-center align-baseline font-bold text-m text-pink-500 hover:text-pink-800 "
        >
          powrót
        </a>
      </div>
    </form>
  );
};

export default ChangePassword;
