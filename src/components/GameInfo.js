import React from "react";

const getColorState = (gameState) => {
  switch(gameState) {
    case "stale":
      return {color: "gray"};
    case "win":
      return {color: "green"};
    case "lose":
      return {color: "red"};
    default:
      return {color: "gray"};
  }
}

// change message and color based on `gameState`'s value
const GameInfo = ({ gameState = "stale", currentPlayer = "unkown" }) => (
  <h3 style={getColorState(gameState)}>It's your turn {currentPlayer}</h3>
);

export default GameInfo;
