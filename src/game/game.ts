type Configuration = {
    canvasWidth: number;
    canvasHeight: number
}

class Game {
  private stage: createjs.Stage;
  
  private config: Configuration;

  constructor(stage: createjs.Stage, config: Configuration) {
    this.stage = stage;
    this.config = config;

    this.initialise();
  }

  private initialise() {
    const graphics = new createjs.Graphics()
      .beginFill("#EBE97A")
      .drawRect(this.config.canvasWidth / 2, this.config.canvasHeight / 2, 380, 100);
    const shape = new createjs.Shape(graphics);
    shape.regX = 190;
    shape.regY = 50;

    const welcomeText = new createjs.Text("CreateJS Boilerplate", "26px Courier", "#EB4646");
    welcomeText.regX = welcomeText.getBounds().width / 2;
    welcomeText.regY = welcomeText.getBounds().height / 2;
    welcomeText.x = this.config.canvasWidth / 2;
    welcomeText.y = this.config.canvasHeight / 2;

    this.stage.addChild(shape, welcomeText);
  }
}

export default Game;
