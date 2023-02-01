import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormValues = {
  time: number;
  teamSize: number;
  team1: string;
  team2: string;
};

const Lobby = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      time: 4,
      teamSize: 2,
      team1: "drużyna 1",
      team2: "drużyna 2",
    },
  });

  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    alert(
      `time: ${data.time} teamSize: ${data.teamSize} team1: ${data.team1} team2: ${data.team2} `
    );
    // CRUD 6 - POST - Create game room and start the broker
    fetch("http://localhost:1337/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: data.time,
        teamSize: data.teamSize,
        team1: data.team1,
        team2: data.team2,
      }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          navigate(`/game/${data.id}`);
        });
      }
    });
  };

  return (
    <div className="flex flex-row flex-end h-screen w-screen">
      <div
        id="spy"
        className="flex h-full w-1/2 items-center justify-center gap-24 text-white"
      >
        <div className="eye">.</div>
        <div className="eye">.</div>
      </div>
      <div className=" flex flex-col items-center justify-center gap-4">
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className="flex flex-col gap-2 items-center"
        >
          <div className="flex w-full mb-6">
            <div className="flex w-1/2">
              {" "}
              <button
                type="submit"
                className="w-42 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
              >
                Rozpocznij rozgrywkę
              </button>
            </div>
            <div className="flex justify-end w-1/2 pr-8">
              {" "}
              <a
                href="/play"
                className="flex items-center align-baseline font-bold text-m text-pink-500 hover:text-pink-800 "
              >
                powrót
              </a>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <label htmlFor="time" className="">
              Długość tury{" "}
            </label>
            <select
              {...register("time")}
              id="time"
              className="w-24 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
            >
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
            <select
              {...register("teamSize")}
              id="teamSize"
              className="w-24 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
            >
              <option value="2">2 graczy</option>
              <option value="3">3 graczy</option>
              <option value="4">4 graczy</option>
              <option value="5">5 graczy</option>
            </select>
          </div>
          <div className="flex gap-4 mt-5">
            <div className="flex flex-row items-center gap-2">
              <input
                {...register("team1")}
                required
                placeholder="drużyna 1"
                maxLength={15}
                autoComplete="off"
                className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                {...register("team2")}
                required
                placeholder="drużyna 2"
                maxLength={15}
                className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
              />
            </div>
          </div>
        </form>

        <div className="flex flex-row gap-4">
          <div id="t1" className="flex flex-col items-center gap-2">
            <ul className="bg-gray-200 w-56 h-80  border border-gray-200 rounded-xl p-4">
              <li>gracz1</li>
            </ul>
          </div>
          <div id="t2" className="flex flex-col items-center gap-2">
            <ul className="bg-gray-200 w-56 h-80  border border-gray-200 rounded-xl p-4"></ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
