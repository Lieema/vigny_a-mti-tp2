import React from "react";
import Board from "../components/Board";
import GameInfo from "../components/GameInfo";

const gameLayoutStyle = {
  width: 650,
  height: `calc(90%)`,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto"
};

class GameLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: Array(9).fill(null),
      currentPlayer: "player 1"
    };
  }

  // getDerivedStateFromProps is called before every render,
  // use it to infer new state values from props or state changes.
  static getDerivedStateFromProps(props, state) {
    return state;
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
    return (
      <div
        style={gameLayoutStyle}        
      >
        <GameInfo  gameState="stale" currentPlayer={ this.state.currentPlayer }  />
        <Board cells={ this.state.cells } onClickFunc={ this.onClickCell(this.state.cells) }/>
      </div>
    );
  }
}

export default GameLayout;
