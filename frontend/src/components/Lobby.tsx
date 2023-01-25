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
  team1: yup
    .string()
    .required("Podaj nazwę drużyny!")
    .min(3, "Nazwa drużyny musi mieć przynajmniej 3 znaki!")
    .max(15, "Nazwa drużyny może mieć maksymalnie 15 znaków!"),
  team2: yup
    .string()
    .required("Podaj nazwę drużyny!")
    .min(3, "Nazwa drużyny musi mieć przynajmniej 3 znaki!")
    .max(15, "Nazwa drużyny może mieć maksymalnie 15 znaków!"),
});

const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
  alert(
    `time: ${data.time} teamSize: ${data.teamSize} team1: ${data.team1} team2: ${data.team2} `
  );
};

const Lobby = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(gameSetupSchema),
    defaultValues: {
      time: 4,
      teamSize: 2,
      team1: "",
      team2: "",
    },
  });
  return (
    <div className="flex flex-row flex-end h-screen w-screen">
      <div id="spy" className="flex h-full w-1/2" />
      <div>
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className="flex flex-col gap-2 pl-28"
        >
          <div className="flex flex-row items-center gap-2">
            <label htmlFor="time">Długość tury</label>
            <select {...register("time")} id="time">
              <option value="1">1 minuta</option>
              <option value="2">2 minuty</option>
              <option value="3">3 minuty</option>
              <option value="4">4 minuty</option>
              <option value="5">5 minuty</option>
              <option value="6">6 minuty</option>
              <option value="7">7 minuty</option>
              <option value="8">8 minuty</option>
              <option value="9">9 minuty</option>
              <option value="10">10 minuty</option>
            </select>
          </div>
          <div className="flex flex-row items-center gap-2">
            <label htmlFor="teamSize">Wielkość drużyny</label>
            <select {...register("teamSize")} id="teamSize">
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input
              {...register("team1")}
              placeholder="nazwa drużyny1"
              autoComplete="off"
              className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
            />
            {errors.team1 && (
              <span className="text-pink-900 font-bold">
                {errors.team1.message}
              </span>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            <input
              {...register("team2")}
              placeholder="nazwa drużyny2"
              className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
            />
            {errors.team2 && (
              <span className="text-pink-900 font-bold">
                {errors.team2.message}
              </span>
            )}
          </div>
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
    </div>
  );
};

export default Lobby;