import Canvasimo from 'canvasimo';

export class Vertex {
  x: number;
  y: number;
  color = '#12d400';
  radius = 10;
  canvasImo: Canvasimo;
  canvasSource: HTMLCanvasElement;
  index: number;
  mouseOver: boolean = false;
  isMoving: boolean = false;

  constructor(
    canvasSource: HTMLCanvasElement,
    canvasImo: Canvasimo,
    x: number,
    y: number,
    index: number
  ) {
    this.x = x;
    this.y = y;
    this.color = '#2C3DD4';
    this.canvasSource = canvasSource;
    this.canvasImo = canvasImo;
    this.index = index;
  }

  render = () => {
    this.canvasImo.fillCircle(this.x, this.y, this.radius, true, this.color);
  };

  mouseMoveHandler = (x: number, y: number, mouseDown: boolean) => {
    if (this.mouseOverVertex(x, y) || this.isMoving) {
      this.applyOverStyles();
      this.mouseOver = true;
      if (mouseDown) {
        this.isMoving = true;
        this.x = x;
        this.y = y;
      } else {
        this.isMoving = false;
      }
    } else {
      this.applyOutStyles();
      this.mouseOver = false;
    }
  };

  applyOverStyles = () => {
    this.radius = 20;
    this.color = '#2C3DD4';
  };

  applyOutStyles = () => {
    this.color = '#2C3DD4';
    this.radius = 10;
  };

  mouseOverVertex = (x, y) => {
    const dx = x - this.x;
    const dy = y - this.y;
    return dx * dx + dy * dy < this.radius * this.radius;
  };
}
