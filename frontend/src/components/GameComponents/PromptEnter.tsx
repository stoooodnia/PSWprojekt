import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../redux/hooks";
import { setRound } from "../../redux/roundSlice";

type FormValues = {
  prompt: string;
  howMany: number;
  team: "blue" | "red" | null;
  show: boolean;
};

const promptSchema = yup.object().shape({
  prompt: yup
    .string()
    .required("Podaj podpowiedź!")
    .max(15, "Podpowiedź jest za długa!")
    .matches(
      /^'?(?:\p{L}\p{M}*)+(?:['\s](?:\p{L}\p{M}*)+)*'?$/u,
      "Podpowiedź może zawierać tylko litery!"
    ),
  howMany: yup
    .string()
    .required("Podaj liczbę!")
    .matches(/^[0-9]$/, "Podaj liczbę od 0 do 9!"),
});

const PromptEnter = () => {
  const dispatch = useAppDispatch();
  const [disablestatus, setDisablestatus] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(promptSchema),
    defaultValues: {
      prompt: "",
      howMany: "" as unknown as number,
      team: "blue",
      show: false,
    },
  });

  const formSubmitHandler: SubmitHandler<FormValues> = (data: FormValues) => {
    dispatch(setRound(data));
    console.log("wyłączone");
    document.getElementById("prompt")!.style.border = "3px solid black";
    document.getElementById("howMany")!.style.border = "3px solid black";
    setDisablestatus(true);
  };

  return (
    <div className="w-full flex justify-around items-center">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="w-full flex justify-center items-center"
      >
        <div className="flex justify-center items-center w-full gap-2">
          <div className="flex items-center gap-2">
            {errors.prompt && (
              <span className="text-pink-900 font-bold">
                {errors.prompt.message}
              </span>
            )}
            <input
              {...register("prompt")}
              id="prompt"
              disabled={disablestatus}
              placeholder="podpowiedź"
              className="w-72 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              {...register("howMany")}
              id="howMany"
              type="number"
              disabled={disablestatus}
              placeholder="ile?"
              className="w-16 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
            />
            {errors.howMany && (
              <span className="text-pink-900 font-bold">
                {errors.howMany.message}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-24 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border  rounded shadow"
        >
          OK
        </button>
      </form>
    </div>
  );
};

export default PromptEnter;
