import React, { useLayoutEffect } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Manual = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  return (
    <div className="flex flex-row h-screen w-screen">
      <div
        id="spy"
        className="flex h-full w-1/2 items-center justify-center gap-24 text-white"
      >
        <div className="eye">.</div>
        <div className="eye">.</div>
      </div>
      <div className="w-1/2">
        <NavBar />
      </div>
    </div>
  );
};

export default Manual;
