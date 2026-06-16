import { RisovarkaDraw } from "./draw.js";
import { btnsRegister  } from "./panel.js";
import { RisovarkaState } from "./state.js";

window.onload = function () {
  const canvas = document.getElementById("canvas");
  
  // Правильно устанавливаем размер canvas
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 200;

  const colorInput = document.getElementById("color-input");
  const sizeInput  = document.getElementById("size-input");

  const state = new RisovarkaState(colorInput.value, parseInt(sizeInput.value));
  const draw  = new RisovarkaDraw(canvas, state);

  draw.clearCanvas();

  btnsRegister(state, draw);

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
