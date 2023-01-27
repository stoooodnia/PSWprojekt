import React from "react";

const Teams = () => {
  const getTeamNames = () => {
    // TODO: get teams from server

    return { team1: "druzyna 1", team2: "druzyna 2" };
  };
  const getPlayers = () => {
    // TODO: get players and their roles from server
    const leader1 = "gracz1";
    const leader2 = "gracz2";
    return {
      leaders: [leader1, leader2],
      team1: ["gracz4"],
      team2: ["gracz3"],
    };
  };

  return (
    <div className="flex flex-col h-1/6">
      <div
        id="teamnames"
        className="p-2 flex flex-row justify-around gap-4 text-2xl font-semibold"
      >
        <div className="text-red-600"> {getTeamNames().team1}</div>
        <div className="text-blue-600"> {getTeamNames().team2}</div>
      </div>
      <div className="h-4/5">
        <div className="w-full h-full flex flex-row justify-around">
          <ul className="bg-gray-200 w-5/12 h-full border border-gray-200 rounded-xl p-4">
            <li className="font-semibold text-red-600">
              {getPlayers().leaders[0]}
            </li>
            {getPlayers().team1.map((player, i) => (
              <li key={i}>{player}</li>
            ))}
          </ul>
          <ul className="bg-gray-200 w-5/12 h-full border border-gray-200 rounded-xl p-4">
            <li className="font-semibold text-blue-600">
              {getPlayers().leaders[1]}
            </li>
            {getPlayers().team2.map((player, i) => (
              <li key={i}>{player}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Teams;
