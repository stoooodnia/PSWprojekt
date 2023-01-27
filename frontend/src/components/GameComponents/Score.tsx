import React from "react";

const Score = () => {
  const getScoreHandler = () => {
    //TODO: get score from server
    return { team1: 0, team2: 0 };
  };
  return (
    <div className="flex w-full h-1/6 justify-center items-center">
      <div
        id="score1"
        className="text-red-600 text-7xl font-bold w-20 flex items-center justify-center"
      >
        {getScoreHandler().team1}
      </div>
      <div id="coma" className="text-black font-bold text-5xl">
        :
      </div>
      <div
        id="score2"
        className="text-blue-600 text-7xl font-bold w-20 flex items-center justify-center"
      >
        {getScoreHandler().team2}
      </div>
    </div>
  );
};

export default Score;
