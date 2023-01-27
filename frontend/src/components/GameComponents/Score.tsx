import React from "react";

const Score = () => {
  const getScore = () => {
    //TODO: get score from server
    return { team1: 0, team2: 0 };
  };
  return (
    <div className="flex w-full mt-2 h-1/12 justify-center items-center">
      <div
        id="score1"
        className="text-red-600 text-7xl font-bold w-20 flex items-center justify-center"
      >
        {getScore().team1}
      </div>
      <div id="coma" className="text-black font-bold text-5xl">
        :
      </div>
      <div
        id="score2"
        className="text-blue-600 text-7xl font-bold w-20 flex items-center justify-center"
      >
        {getScore().team2}
      </div>
    </div>
  );
};

export default Score;
