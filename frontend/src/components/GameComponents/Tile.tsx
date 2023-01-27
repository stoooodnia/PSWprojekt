import React, { useState } from "react";

interface Props {
  tkey: number;
  show: boolean;
  color: string;
  word: string;
  chosen: number[];
  setChosen: (arg: number[]) => void;
}

const Tile = ({ tkey, color, show, word, setChosen, chosen }: Props) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const hoverHandler = () => {};
  const clickHandler = () => {
    if (!clicked) {
      setChosen([...chosen, tkey]);
      setClicked(true);
      console.log("clicked" + chosen);
    } else {
      setClicked(false);
      console.log("unclicked" + chosen);
      setChosen(chosen.filter((item) => item !== tkey));
    }
  };

  return (
    <td
      onClick={() => clickHandler()}
      className="border-2 rounded-xl border-myBlack w-44 h-24 m-2 text-xl font-medium flex items-center justify-center"
      style={{
        backgroundColor: show ? color : "white",
        border: clicked ? "4px solid black" : "",
      }}
    >
      {word}
    </td>
  );
};

export default Tile;
