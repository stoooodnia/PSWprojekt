import React from "react";
import BoardInfo from "./GameComponents/BoardInfo";
import Teams from "./GameComponents/Teams";
import Chat from "./GameComponents/Chat";
import Score from "./GameComponents/Score";
import Timer from "./GameComponents/Timer";
import BoardColorsLayout from "./GameComponents/BoardColorsLayout";
import PromptEnter from "./GameComponents/PromptEnter";
import ShowPrompt from "./GameComponents/ShowPrompt";
import { useAppSelector } from "../redux/hooks";

const gameExecuter = () => {
  const selectedTiles = useAppSelector((state) => state.tile.selectedTiles);
  const round = useAppSelector((state) => state.round);
  const team = useAppSelector((state) => state.round.team);
};

const Game = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  const isLeader = true;
  return (
    <div id="main" className="bg-white flex h-full w-full">
      <div id="left" className="w-3/4 flex flex-col">
        <div id="topleft" className="h-1/12 flex">
          <Timer expiryTimestamp={time} timerControlArg={"start"} />
          {isLeader ? <PromptEnter /> : <ShowPrompt />}
        </div>
        <div id="tiles" className="w-full h-full ">
          <BoardInfo />
        </div>
      </div>
      <div id="right" className="mr-10 w-1/4 h-screen">
        <Score />
        <Teams />
        <Chat />
        {isLeader ? <BoardColorsLayout /> : <></>}
      </div>
    </div>
  );
};

export default Game;
