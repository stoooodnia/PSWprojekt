import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import Board from "./Board";
import { words, board } from "../../utils/samples";
import { shuffleArray } from "../../utils/shuffleArray";

const BoardInfo = () => {
  const [show, setShow] = useState(false);
  const [chosen, setChosen] = useState<number[]>([]);
  const getWords = () => {
    shuffleArray(words);
    return words;
  };
  const getBoard = () => {
    return board;
  };

  useEffect(() => {
    console.log(chosen);
  }, [chosen]);

  return (
    <Board
      words={getWords()}
      board={getBoard()}
      show={show}
      chosen={chosen}
      setChosen={setChosen}
    />
  );
};

export default BoardInfo;
