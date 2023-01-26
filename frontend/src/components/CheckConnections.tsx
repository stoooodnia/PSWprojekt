import React, { useLayoutEffect, useState } from "react";

const CheckConnections = () => {
  useLayoutEffect(() => {
    fetch("http://localhost:1337/healthcheck", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) =>
        res.status === 200
          ? console.log("connected to server")
          : console.log("not connected to server")
      )
      .catch((err) => console.log("Brak połączenia z serwerem"));
  }, []);

  return <div hidden></div>;
};

export default CheckConnections;
