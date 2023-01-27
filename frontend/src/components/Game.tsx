import React from "react";
import BoardInfo from "./GameComponents/BoardInfo";
import Lobby from "./GameComponents/Teams";
import Chat from "./GameComponents/Chat";
import Score from "./GameComponents/Score";
import Timer from "./GameComponents/Timer";
import Word from "./GameComponents/Word";

const Game = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  return (
    <div id="main" className="bg-white flex">
      <div id="left" className="w-3/4 h-screen">
        <div id="topleft">
          <Timer expiryTimestamp={time} timerControlArg={"start"} />
          <Word />
        </div>
        <div id="tiles" className="w-full h-full">
          <BoardInfo />
        </div>
      </div>
      <div id="right" className="border-l-2 border-black">
        <div id="score"></div>
        <div id="lobby"></div>
        <div id="chat"></div>
      </div>
    </div>
  );
};

export default Game;
