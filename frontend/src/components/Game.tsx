import React from "react";
import BoardInfo from "./GameComponents/BoardInfo";
import Teams from "./GameComponents/Teams";
import Chat from "./GameComponents/Chat";
import Score from "./GameComponents/Score";
import Timer from "./GameComponents/Timer";
import Word from "./GameComponents/Word";
import BoardColorsLayout from "./GameComponents/BoardColorsLayout";

const Game = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  return (
    <div id="main" className="bg-white flex h-full w-full">
      <div id="left" className="w-3/4 flex flex-col">
        <div id="topleft" className="h-1/12">
          <Timer expiryTimestamp={time} timerControlArg={"start"} />
          <Word />
        </div>
        <div id="tiles" className="w-full h-full ">
          <BoardInfo />
        </div>
      </div>
      <div id="right" className="border-l-2 border-black w-1/4 h-screen">
        <Score />
        <Teams />
        <Chat />
        <BoardColorsLayout />
      </div>
    </div>
  );
};

export default Game;
