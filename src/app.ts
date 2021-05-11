import createjs from "@createjs";
import { CONFIG } from "@/config";
import Game from "./game";
import "./styles.css";

class App {
  static getStage() {
    const canvas = document.getElementById("stage");

    if (!canvas) {
      throw new Error("Stage element not found");
    }

    return canvas as HTMLCanvasElement;
  }

  static getStageScale() {
    return Math.min(window.innerWidth / CONFIG.canvasWidth, window.innerHeight / CONFIG.canvasHeight);
  }

  static getDevicePixelRatio() {
    return window.devicePixelRatio;
  }

  public canvas: HTMLCanvasElement;

  private stage: createjs.Stage;

  private game: Game | undefined;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.stage = new createjs.Stage(this.canvas);
    this.game = undefined;
  }

  get isInitialised() {
    return Boolean(this.game);
  }

  public initialise() {
    createjs.Ticker.framerate = CONFIG.framerate;

    createjs.Ticker.on("tick", () => {
      this.stage.update();
    });

    this.resize();

    window.addEventListener("resize", () => {
      this.resize();
    });

    this.game = new Game(this.stage, CONFIG);
  }

  public resize() {
    const stageScale = App.getStageScale();
    const devicePxRatio = App.getDevicePixelRatio();
    const scaledWidth = CONFIG.canvasWidth * stageScale;
    const scaledHeight = CONFIG.canvasHeight * stageScale;
    // the canvas css dimensions are scaled to meet the viewport dimensions
    this.canvas.style.width = `${scaledWidth}px`;
    this.canvas.style.height = `${scaledHeight}px`;
    // the canvas intrinsic dimensions are instead scaled to match the device pixels in the viewport dimensions
    this.canvas.width = scaledWidth * devicePxRatio;
    this.canvas.height = scaledHeight * devicePxRatio;
    // the stage is scaled to match the scale of the canvas intrinsic dimensions
    this.stage.scaleX = stageScale * devicePxRatio;
    this.stage.scaleY = stageScale * devicePxRatio;

  }
}

export default App;
