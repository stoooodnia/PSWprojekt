import React, { useState } from "react";
import Tile from "./Tile";

type Props = {
  words: string[];
  board: string[][];
};

const Board = ({ words, board }: Props) => {
  let wordIndex = 0;
  // show true colors
  const [show, setShow] = useState(false);
  const [chosen, setChosen] = useState<number[]>([]);

  return (
    <table className="h-full w-full bg-white flex flex-col justify-center">
      <tbody>
        {board.map((row, i) => {
          return (
            <tr key={i} className="flex flex-row items-center justify-center">
              {row.map((tile, j) => {
                var tempWord: string = words[wordIndex];
                wordIndex++;
                return (
                  <Tile
                    key={parseInt(i.toString() + j.toString())}
                    tkey={parseInt(i.toString() + j.toString())}
                    color={tile}
                    show={show}
                    word={tempWord}
                    chosen={chosen}
                    setChosen={setChosen}
                  />
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
