import createjs from "@createjs";
import { handleResize } from "@/utils";
import { CONFIG } from "@/config";
import Game from "./game";
import "./styles.css";

const getCanvas = () => {
  const canvas = document.getElementById("stage");

  if (!canvas) {
    throw new Error("Stage element not found");
  }

  return canvas as HTMLCanvasElement;
};

const init = () => {
  const canvas = getCanvas();
  const stage = new createjs.Stage(canvas);

  createjs.Ticker.framerate = CONFIG.framerate;

  createjs.Ticker.on("tick", () => {
    stage.update();
  });

  handleResize(canvas, stage);
  window.onresize = () => handleResize(canvas, stage);

  return new Game(stage, CONFIG);
};

document.addEventListener("DOMContentLoaded", init);
