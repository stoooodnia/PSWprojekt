import React from "react";

type Probs = {
  color: string;
};

const SmallTile = ({ color }: Probs) => {
  return (
    <td
      className="w-6 h-6 m-1  "
      style={{
        backgroundColor: color,
        border: color === "white" ? "2px solid gray" : "",
      }}
    ></td>
  );
};

export default SmallTile;
