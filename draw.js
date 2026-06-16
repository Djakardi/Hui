import { ToolsEnum } from "./state.js";

export class RisovarkaDraw {
  constructor(canvas, state) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.state = state;

    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.animationId = null;
    this.baseImage = null;
  }

  getCanvasPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  _applyStyle() {
    this.ctx.strokeStyle = this.state.color;
    this.ctx.lineWidth   = this.state.pencilSize;
    this.ctx.lineCap = "round";
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onDrawStart(x, y) {
    this.startX   = x;
    this.startY   = y;
    this.currentX = x;
    this.currentY = y;

    if (this.state.tool === ToolsEnum.PENCIL || this.state.tool === ToolsEnum.ERASER) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    }

    if (this.state.tool === ToolsEnum.RECT || this.state.tool === ToolsEnum.CIRCLE) {
      this.baseImage = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
      this._startShapeAnimation();
    }
  }
  
  onDrawMove(x, y) {
    const tool = this.state.tool;

    if (tool === ToolsEnum.PENCIL) {
      this._applyStyle();
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }

    if (tool === ToolsEnum.ERASER) {
      this.ctx.strokeStyle = "#ffffff";
      this.ctx.lineWidth   = this.state.pencilSize * 3;
      this.ctx.lineCap     = "round";
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }

    this.currentX = x;
    this.currentY = y;
  }


  _startShapeAnimation() {
    const tool = this.state.tool;

    const frame = () => {
      this.ctx.putImageData(this.baseImage, 0, 0); 
      this._applyStyle();

      if (tool === ToolsEnum.RECT) {
        this.ctx.strokeRect(
          this.startX,
          this.startY,
          this.currentX - this.startX,
          this.currentY - this.startY
        );
      }

      if (tool === ToolsEnum.CIRCLE) {
        const rx = (this.currentX - this.startX) / 2;
        const ry = (this.currentY - this.startY) / 2;
        this.ctx.beginPath();
        this.ctx.ellipse(
          this.startX + rx,
          this.startY + ry,
          Math.abs(rx),
          Math.abs(ry),
          0, 0, Math.PI * 2
        );
        this.ctx.stroke();
      }

      this.animationId = requestAnimationFrame(frame);
    };

    this.animationId = requestAnimationFrame(frame);
  }

  _stopShapeAnimation() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }


  onDrawEnd() {
    if (this.state.tool === ToolsEnum.RECT || this.state.tool === ToolsEnum.CIRCLE) {
      this._stopShapeAnimation();
      this.baseImage = null;
    }

    this.ctx.beginPath(); 
  }
}
