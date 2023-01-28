import React from "react";
import NavBar from "./NavBar";

const Stats = () => {
  return (
    <div className="flex flex-row h-screen w-screen">
      <div
        id="spy"
        className="flex h-full w-1/2 items-center justify-center gap-24 text-white"
      >
        <div className="eye">.</div>
        <div className="eye">.</div>
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  );
};

export default Stats;
