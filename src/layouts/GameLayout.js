import React from "react";
import Board from "../components/Board";
import GameInfo from "../components/GameInfo";
import Cell from "../components/Cell";

const gameLayoutStyle = {
  width: 650,
  height: `calc(90%)`,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto"
};

const horizontalWin = (cells, nbLineCells) => {
  for (let vIndex = 0; vIndex < nbLineCells; vIndex++) {
      const c = cells[vIndex * nbLineCells];
      let hasWin = true;
      for (let hIndex = 0; hIndex < nbLineCells; hIndex++) {
        if (cells[vIndex * nbLineCells + hIndex] !== c) {
          hasWin = false;
          break;
        }
      }
      if (hasWin) {
        return c;
      }
  }
  return null;
}

const verticalWin = (cells, nbLineCells) => {
  for (let vIndex = 0; vIndex < nbLineCells; vIndex++) {
      const c = cells[vIndex];
      let hasWin = true;
      for (let hIndex = 0; hIndex < nbLineCells; hIndex++) {
        if (cells[hIndex * nbLineCells + vIndex] !== c) {
          hasWin = false;
          break;
        }
      }
      if (hasWin) {
        return c;
      }
  }
  return null;
}

const diagWin = (cells, nbLineCells) => {
  const diag1 = cells[0];
  const diag2 = cells[nbLineCells - 1];
  let isWinDiag1 = true;
  let isWinDiag2 = true;
  for (let index = 1; index < nbLineCells; index++) {
    if (diag1 !== cells[index * nbLineCells + index]) {
      isWinDiag1 = false;
    }
    if (diag2 !== cells[(nbLineCells - 1) * (index + 1)]) {
      isWinDiag2 = false;
    }
  }
  if (isWinDiag1) {
    return diag1;
  }
  else if (isWinDiag2) {
    return diag2;
  }
  return null;
}

const isWin = (cells, nbLineCells) => {
  if (cells == null)
    return null;
  const vWin = verticalWin(cells, nbLineCells);
  if (vWin !== null) {
    return vWin;
  }

  const hWin = horizontalWin(cells, nbLineCells);
  if (hWin !== null) {
    return hWin;
  }

  const dWin = diagWin(cells, nbLineCells);
  if (dWin !== null) {
    return dWin;
  }
  return null;      
}

class GameLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nbLineCells: props.nbLineCells,
      cells: Array(props.nbLineCells*props.nbLineCells).fill(null),
      currentPlayer: "player 1",
      gameState: "stale"
    };
  }

  // getDerivedStateFromProps is called before every render,
  // use it to infer new state values from props or state changes.
  static getDerivedStateFromProps(props, state) {
    if (state.gameState === "stale") {
      const winner = isWin(state.cells, state.nbLineCells);
      if (winner !== null) {
        if (winner === "X") {
          state.gameState = "win";
        }
        else if (winner === "O") {
          state.gameState = "lose";
        }
      }
      else {
        if (!state.cells.includes(null)){
          state.gameState = "draw";
        }
      }
    }
    return state;
  }

  startGame = () => {
    this.setState({
      gameState: "stale",
      cells: Array(this.state.nbLineCells*this.state.nbLineCells).fill(null),
      currentPlayer: "player 1"
    });
  }

  getNextPlayer(currentPlayer) {
    if (currentPlayer === "player 1")
      return "player 2";
    return "player 1";
  }

  onClickCell(cellsOld) {
    return (index) => {
      if (cellsOld[index] != null)
        return;
      cellsOld[index] = this.state.currentPlayer === "player 1" ? "X" : "O";
      this.setState({
        cells: cellsOld,
        currentPlayer: this.getNextPlayer(this.state.currentPlayer)
      });
    };
  }  

  render() {
    if (this.state.gameState === "stale") {
      return (
        <div
          style={gameLayoutStyle}        
        >
          <GameInfo  gameState={ this.state.gameState } currentPlayer={ this.state.currentPlayer }  />
          <Board cells={ this.state.cells } onClickFunc={ this.onClickCell(this.state.cells) }  nbLineCells={ this.state.nbLineCells }/>
        </div>
      );
    }
    else {
      return (
        <div
          style={gameLayoutStyle}        
        >
          <GameInfo  gameState={ this.state.gameState } currentPlayer={ this.getNextPlayer(this.state.currentPlayer) }/>
          <Cell content="Play again ?" onClickFunc={ this.startGame }/>
        </div>
      );
    }
  }
}

export default GameLayout;
