import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-row flex-end h-screen w-screen">
      {" "}
      <div
        id="spy"
        className="flex h-full w-1/2 items-center justify-center gap-24 text-white"
      >
        <div className="eye">.</div>
        <div className="eye">.</div>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-7xl mt-10">404</h1>
        <h2 className="text-5xl">Nie ma takiej strony!</h2>
      </div>
    </div>
  );
};

export default NotFound;
