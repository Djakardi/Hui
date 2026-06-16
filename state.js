export const ToolsEnum = {
  PENCIL: "pencil",
  ERASER: "eraser",
  RECT:   "rect",
  CIRCLE: "circle",
  LINE:   "line",
};

export class RisovarkaState {
  constructor(color, pencilSize) {
    this.tool = ToolsEnum.PENCIL;
    this.color = color;
    this.pencilSize = pencilSize;
  }

  selectTool(tool) { this.tool = tool; }
  setColor(color)  { this.color = color; }
  setPencilSize(size) { this.pencilSize = size; }
}