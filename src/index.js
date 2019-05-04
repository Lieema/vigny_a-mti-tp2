import React from "react";
import { render } from "react-dom";
import GameLayout from "./layouts/GameLayout";

render(<GameLayout nbLineCells={3} />, document.getElementById("root"));
