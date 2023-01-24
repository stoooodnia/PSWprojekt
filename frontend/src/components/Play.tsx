import React from "react";
import NavBar from "./NavBar";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  id: string;
};

const loginSchema = yup.object().shape({
  id: yup
    .string()
    .required("Podaj id gry!")
    .min(6, "ID gry ma 6 znaków!")
    .max(6, "ID gry ma 6 znaków!"),
});

const Play = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      id: "",
    },
  });

  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    alert(`id: ${data.id}`);
  };

  return (
    <div className="flex flex-row h-screen w-screen">
      <div id="spy" className="flex h-full w-1/2" />
      <div className="flex flex-col w-1/2 h-full">
        <NavBar />
        <div className="flex flex-col items-center gap-4">
          <a
            href="/lobby"
            className="h-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
          >
            Stwórz grę
          </a>
          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            className="flex flex-row gap-2"
          >
            <div className="flex flex-col items-center gap-2">
              <input
                {...register("id")}
                placeholder="ID Gry"
                autoComplete="off"
                className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
              />
              {errors.id && (
                <span className="text-pink-900 font-bold">
                  {errors.id.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-32 h-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
            >
              dołącz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Play;
