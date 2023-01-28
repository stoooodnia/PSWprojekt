import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setShow } from "../../redux/roundSlice";

const ShowPrompt = () => {
  const round = useAppSelector((state) => state.round);
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    const payload = {
      prompt: round.prompt,
      howMany: round.howMany,
      team: round.team,
      show: true,
    };
    dispatch(setShow(payload));
  };
  return (
    <div className="w-full flex justify-around items-center ">
      <div className="flex text-3xl">
        <div>{round.prompt}</div>
        <div className="mr-2 ml-2"> : </div>
        <div>{round.howMany}</div>
      </div>
      <button
        className="w-32 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
        onClick={() => onClickHandler()}
      >
        SPRAWDŹ
      </button>
    </div>
  );
};

export default ShowPrompt;
