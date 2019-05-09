import React from "react";
import Cell from "./Cell";

const boardStyle = {
  display: "grid",
  width: "600px",
  height: "calc(100%)",
  gridAutoRows: "auto"
};

const getStyleGrid = (nbLineCells) => {
  return "auto-flow dense /" + " 1fr".repeat(nbLineCells);
}

const Board = ({ cells = [], onClickFunc, nbLineCells}) => (  
  <div style={{...boardStyle, grid: getStyleGrid(nbLineCells)}}>{cells.map((c, i) => <Cell content={ c } onClickFunc={ () => { onClickFunc(i) } } sideSize={ nbLineCells }/>)}</div>
);

export default Board;
