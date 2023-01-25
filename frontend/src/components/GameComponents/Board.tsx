import React, { useState } from "react";
import Tile from "./Tile";
import { randomNoRepeats } from "../../utils/randomNoReapets";
import { words, board } from "../../utils/samples";

const Board = () => {
  var chooser = randomNoRepeats(words);
  // show true colors
  const [show, setShow] = useState(false);

  return (
    <table className="h-full w-full bg-white flex flex-col justify-center">
      <tbody>
        {board.map((row, i) => {
          return (
            <tr key={i} className="flex flex-row items-center justify-center">
              {row.map((tile, j) => {
                var tempWord: string = chooser();
                return (
                  <Tile key={j} color={tile} show={show} word={tempWord} />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Board;
