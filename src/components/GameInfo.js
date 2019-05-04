import React from "react";

const getColorState = (gameState) => {
  switch(gameState) {
    case "stale":
      return {color: "gray"};
    case "win":
      return {color: "yellow"};
    case "lose":
      return {color: "red"};
    case "draw":
      return {color: "purple"};
    default:
      return {color: "gray"};
  }
}

// change message and color based on `gameState`'s value
const GameInfo = ({ gameState = "stale", currentPlayer = "unkown" }) => {
  switch(gameState) {
    case "stale":
      return (<h3 style={getColorState(gameState)}>It's your turn {currentPlayer}</h3>);
    case "draw":
      return (<h3 style={getColorState(gameState)}>It's a draw !</h3>);
    default:
      return (<h3 style={getColorState(gameState)}>{currentPlayer} has won the game !</h3>);
  }
}

export default GameInfo;
