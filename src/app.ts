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
    const scale = App.getStageScale();
    const width = CONFIG.canvasWidth * scale;
    const height = CONFIG.canvasHeight * scale;

    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.stage.scaleX = scale;
    this.stage.scaleY = scale;
  }
}

export default App;
