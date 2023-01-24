import React from "react";
import { useTimer } from "react-timer-hook";

type Probs = {
  expiryTimestamp: Date;
};

const Timer = ({ expiryTimestamp }: Probs) => {
  const { seconds, minutes, isRunning, start, restart, pause, resume } =
    useTimer({ expiryTimestamp });

  return (
    <div className="p-2 text-5xl">
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
};

export default Timer;
