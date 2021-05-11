import createjs from "@createjs";
import { handleResize } from "@/utils";
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

  public canvas: HTMLCanvasElement;

  private stage: createjs.Stage;

  private game: Game | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.stage = new createjs.Stage(this.canvas);
    this.game = null;
  }

  public initialise() {
    createjs.Ticker.framerate = CONFIG.framerate;

    createjs.Ticker.on("tick", () => {
      this.stage.update();
    });

    handleResize(this.canvas, this.stage);
    window.onresize = () => handleResize(this.canvas, this.stage);

    this.game = new Game(this.stage, CONFIG);
  }
}

export default App;
