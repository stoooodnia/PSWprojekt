import React from "react";
import ChangeEmail from "./ProfileComponents/ChangeEmail";
import ChangePassword from "./ProfileComponents/ChangePassword";
import ChangeNickname from "./ProfileComponents/ChangeNickname";

const changeDetails = () => {
  return (
    <div className="flex flex-row flex-end h-screen w-screen">
      <div
        id="spy"
        className="flex h-full w-1/2 items-center justify-center gap-24 text-white"
      >
        <div className="eye">.</div>
        <div className="eye">.</div>
      </div>
      <div className="flex flex-col flex-end justify-center items-center h-full w-1/2 gap-10">
        <h1 className="text-7xl">ZMIEŃ DANE</h1>
        <div className="w-full flex flex-col gap-5">
          <ChangeEmail />
          <ChangeNickname />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default changeDetails;
