import React from "react";

interface Props {
  color: string;
}

const Tile = ({ color }: Props) => {
  return <div className="border-2 rounded-xl border-myBlack w-44 h-24"></div>;
};

export default Tile;
