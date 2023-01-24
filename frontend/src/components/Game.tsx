import React from "react";
import Tile from "./GameComponents/Tile";
import Lobby from "./GameComponents/Lobby";
import Chat from "./GameComponents/Chat";
import Score from "./GameComponents/Score";
import Timer from "./GameComponents/Timer";
import Word from "./GameComponents/Word";

const Board = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  return (
    <div id="main" className="bg-white h-screen w-screen flex">
      <div id="left" className="w-3/4 h-max">
        <div id="topleft">
          <Timer expiryTimestamp={time} />
          <Word />
        </div>
        <div id="tiles"></div>
      </div>
      <div id="right" className="border-l-2 border-black">
        <div id="score"></div>
        <div id="lobby"></div>
        <div id="chat"></div>
      </div>
    </div>
  );
};

export default Board;
