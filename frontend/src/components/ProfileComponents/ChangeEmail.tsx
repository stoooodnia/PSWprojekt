import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
type FormValues = {
  email: string;
};

const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Podaj prawidłowy adres email!")
    .required("Podaj nowy adres email!"),
});

// TODO: Get user form cookie
const getUser = () => {
  return Cookie.get("userLoggedId");
};

const ChangeEmail = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();

  const [Status, setStatus] = useState("");
  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    // CRUD 7 - PUT -  Change email
    fetch("http://localhost:1337/api/changeEmail", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: getUser(),
        newemail: data.email,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log("zmieniono mail użytkownika");
        });
        setError("email", {
          type: "manual",
          message: "Email został zmieniony!",
        });
      }
      if (response.status === 409) {
        setError("email", {
          type: "manual",
          message: "Użytkownik o podanym adresie email już istnieje!",
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
          {...register("email")}
          placeholder="nowy email"
          className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
        />
        {errors.email && (
          <span className="text-pink-900 font-bold">
            {errors.email.message}
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

export default ChangeEmail;
