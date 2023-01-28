import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
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
  const show = useAppSelector((state) => state.round.show);
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
        backgroundColor: show && isSelected ? bgcolor : "white",
        color: show && isSelected && bgcolor === "black" ? "white" : "black",
        border: isSelected ? "7px solid black" : "",
      }}
    >
      {word}
    </td>
  );
};

export default Tile;
