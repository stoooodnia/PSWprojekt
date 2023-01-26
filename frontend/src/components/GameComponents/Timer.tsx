import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

type Probs = {
  expiryTimestamp: Date;
  timerControlArg: string;
};

const Timer = ({ expiryTimestamp, timerControlArg }: Probs) => {
  const { seconds, minutes, isRunning, start, restart, pause, resume } =
    useTimer({ expiryTimestamp });

  const timerControl = (t: string) => {
    if (t === "start") {
      start();
    } else if (t === "pause") {
      pause();
    } else if (t === "resume") {
      resume();
    } else if (t === "restart") {
      restart(expiryTimestamp, false);
    }
  };

  useEffect(() => {
    timerControl(timerControlArg);
  }, [timerControlArg]);

  return (
    <div className="p-2 text-5xl">
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
};

export default Timer;x
