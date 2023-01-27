import React from "react";
import { board } from "../../utils/samples";
import SmallTile from "./SmallTile";

const BoardColorsLayout = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <table className="flex flex-col">
        <tbody>
          {board.map((row, i) => {
            return (
              <tr key={i} className="flex flex-row">
                {row.map((tile, j) => {
                  return (
                    <SmallTile
                      key={parseInt(i.toString() + j.toString())}
                      color={tile}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BoardColorsLayout;
