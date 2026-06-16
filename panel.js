import { ToolsEnum } from "./state.js";

export function btnsRegister(state, draw) {
  const btnsMap = {
    "pencil": ToolsEnum.PENCIL,
    "eraser": ToolsEnum.ERASER,
    "rect":   ToolsEnum.RECT,
    "circle": ToolsEnum.CIRCLE,
    "line":   ToolsEnum.LINE,
  };

  Object.keys(btnsMap).forEach((btnId) => {
    const btn = document.querySelector(`#${btnId}`);
    if (!btn) {
      console.error(`Button with id ${btnId} not found`);
      return;
    }

    btn.addEventListener("click", () => {
      state.selectTool(btnsMap[btnId]);
    });
  });

  const clearBtn = document.querySelector("#clear");
  clearBtn.addEventListener("click", () => {
    draw.clearCanvas();
  });

  const colorInput = document.querySelector("#color-input");
  colorInput.addEventListener("change", (e) => {
    state.setColor(e.target.value);
  });

  const sizeInput = document.querySelector("#size-input");
  sizeInput.addEventListener("change", (e) => {
    state.setPencilSize(parseInt(e.target.value));
  });

  colorInput.value = state.color;
  sizeInput.value  = state.pencilSize;
}
