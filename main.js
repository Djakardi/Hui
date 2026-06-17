import { RisovarkaDraw } from "./draw.js";
import { btnsRegister  } from "./panel.js";
import { RisovarkaState } from "./state.js";

function resizeCanvas(canvas, draw) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw.clearCanvas();
}

window.onload = function () {
  const canvas = document.getElementById("canvas");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colorInput = document.getElementById("color-input");
  const sizeInput  = document.getElementById("size-input");

  const state = new RisovarkaState(colorInput.value, parseInt(sizeInput.value));
  const draw  = new RisovarkaDraw(canvas, state);

  colorInput.value = state.color;
  sizeInput.value = state.pencilSize;

  draw.clearCanvas();

  btnsRegister(state, draw);s

  window.addEventListener("resize", () => {
    resizeCanvas(canvas, draw);
  });

  let isDrawing = false;

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const { x, y } = draw.getCanvasPos(e);
    draw.onDrawStart(x, y);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    const { x, y } = draw.getCanvasPos(e);
    draw.onDrawMove(x, y);
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    draw.onDrawEnd();
  });

  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
    draw.onDrawEnd();
  });
};
