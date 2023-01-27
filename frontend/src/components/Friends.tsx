import React from "react";
import NavBar from "./NavBar";

const Friends = () => {
  return (
    <div className="flex flex-row h-screen w-screen">
      <div id="spy" className="flex h-full w-1/2" />
      <div>
        <NavBar />
      </div>
    </div>
  );
};

export default Friends;
