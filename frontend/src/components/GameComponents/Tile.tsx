import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { selectTile, deselectTile } from "../../redux/tilesSlice";

interface Props {
  tkey: number;
  bgcolor: string;
  word: string;
}

const Tile = ({ tkey, bgcolor, word }: Props) => {
  const selectedTiles = useAppSelector((state) => state.tile.selectedTiles);
  const isSelected = selectedTiles[tkey];
  const dispatch = useAppDispatch();
  const show = true;
  const hoverHandler = () => {};
  const clickHandler = () => {
    // if (!clicked) {
    //   setChosen([...chosen, tkey]);
    //   setClicked(true);
    // } else {
    //   setClicked(false);
    //   setChosen(chosen.filter((item) => item !== tkey));
    //
    if (!isSelected) {
      dispatch(selectTile(tkey));
    } else {
      dispatch(deselectTile(tkey));
    }
    console.log(selectedTiles);
  };

  return (
    <td
      onClick={() => clickHandler()}
      className="border-2 rounded-xl border-myBlack w-44 h-24 m-2 text-xl font-medium flex items-center justify-center"
      style={{
        backgroundColor: show ? bgcolor : "white",
        color: show && bgcolor === "black" ? "white" : "black",
        border: isSelected ? "7px solid black" : "",
      }}
    >
      {word}
    </td>
  );
};

export default Tile;
