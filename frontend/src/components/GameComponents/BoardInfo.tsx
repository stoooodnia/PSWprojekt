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
  const getWords = () => {
    shuffleArray(words);
    return words;
  };

  const getBoard = () => {
    return board;
  };

  return <Board words={getWords()} board={getBoard()} />;
};

export default BoardInfo;
