import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordStrengthBar from "react-password-strength-bar";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

type FormValues = {
  nickname: string;
};

const registerSchema = yup.object().shape({
  nickname: yup
    .string()
    .required("Podaj nowy nick!")
    .min(3, "Nowy niick musi mieć przynajmniej 3 znaki!")
    .max(15, "Nowy nick może mieć maksymalnie 15 znaków!"),
});

// TODO: Get user form cookie
const getUser = () => {
  return Cookie.get("userLoggedNickname");
};

const ChangeNickname = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      nickname: "",
    },
  });

  const [Status, setStatus] = useState("");
  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    // CRUD 8 - PUT -  Change nickname
    fetch("http://localhost:1337/api/changeNickname", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: getUser(),
        newNickname: data.nickname,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log("zmieniono nickname użytkownika");
        });
        setError("nickname", {
          type: "manual",
          message: "Nickname został zmieniony!",
        });
      }
      if (response.status === 409) {
        setError("nickname", {
          type: "manual",
          message: "Użytkownik o podanym nicknamie już istnieje!",
        });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="flex flex-col gap-2 pl-28"
    >
      <div className="flex flex-row items-center gap-2">
        <input
          {...register("nickname")}
          placeholder="nowy nick"
          className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
        />
        {errors.nickname && (
          <span className="text-pink-900 font-bold">
            {errors.nickname.message}
          </span>
        )}
      </div>
      <div className="flex gap-6">
        <button
          type="submit"
          className="w-32 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
        >
          zmień
        </button>
      </div>
    </form>
  );
};

export default ChangeNickname;
