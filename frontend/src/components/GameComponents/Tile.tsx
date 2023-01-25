import React from "react";

interface Props {
  show: boolean;
  color: string;
  word: string;
}

const Tile = ({ color, show, word }: Props) => {
  return (
    <td
      className="border-2 rounded-xl border-myBlack w-44 h-24 m-2 text-xl font-medium flex items-center justify-center"
      style={{ backgroundColor: show ? color : "white" }}
    >
      {word}
    </td>
  );
};

export default Tile;
