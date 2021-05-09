const stageID = "stage";

export const createDOMStage = () => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", stageID);
  return canvas;
};

export const getDOMStage = () => {
  const stage = document.getElementById(stageID);

  if (!stage) {
    throw new Error("Stage element not found");
  }

  return (stage as HTMLCanvasElement);
};
