import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  time: number;
  teamSize: number;
  team1: string;
  team2: string;
};

const gameSetupSchema = yup.object().shape({
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

const Lobby = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(gameSetupSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
    },
  });
  return (
    <div>
      <div id="spy" className="flex h-full w-1/2" />
      <div></div>
    </div>
  );
};

export default Lobby;
