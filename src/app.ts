import createjs from "@createjs";
import { getDOMStage, handleResize } from "@/utils";

import { CONFIG } from "@/config";

import "./styles.css";

const init = () => {
  window.onload = () => {
    createjs.Ticker.framerate = CONFIG.framerate;

    const canvas = getDOMStage();
    const stage = new createjs.Stage(canvas);

    createjs.Ticker.on("tick", () => {
      stage.update();
    });

    const graphics = new createjs.Graphics()
      .beginFill("#EBE97A")
      .drawRect(CONFIG.canvasWidth / 2, CONFIG.canvasHeight / 2, 380, 100);
    const shape = new createjs.Shape(graphics);
    shape.regX = 190;
    shape.regY = 50;

    const welcomeText = new createjs.Text("CreateJS Boilerplate", "26px Courier", "#EB4646");
    welcomeText.regX = welcomeText.getBounds().width / 2;
    welcomeText.regY = welcomeText.getBounds().height / 2;
    welcomeText.x = CONFIG.canvasWidth / 2;
    welcomeText.y = CONFIG.canvasHeight / 2;

    stage.addChild(shape, welcomeText);

    handleResize(canvas, stage);
    window.onresize = () => handleResize(canvas, stage);
  };
};

init();
