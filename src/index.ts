import App from "./app";
import "./styles.css";

const init = () => {
  const app = new App(App.getStage());

  app.initialise();
};

document.addEventListener("DOMContentLoaded", init);
