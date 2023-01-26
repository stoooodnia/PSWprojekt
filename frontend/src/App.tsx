import React, { useEffect, useState } from "react";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";
// import { io } from "socket.io-client";

// const socket = io.connect("http://localhost:5174");

function App() {
  return <div></div>;
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [lastPong, setLastPong] = useState(new Date().toISOString());

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setIsConnected(true);
  //   });

  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });

  //   socket.on("pong", () => {
  //     setLastPong(new Date().toISOString());
  //   });

  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("pong");
  //   };
  // }, []);

  // const sendPing = () => {
  //   socket.emit("ping");
  // };

  // // return <RouterProvider router={router} />;
  // return (
  //   <div>
  //     <p>Connected: {"" + isConnected}</p>
  //     <p>Last pong: {lastPong || "-"}</p>
  //     <button onClick={sendPing}>Send ping</button>
  //   </div>
  // );
}

export default App;
