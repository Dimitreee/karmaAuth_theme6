import { Canvasimo } from 'canvasimo';
import { Vertex } from './index';

export class Shape {
  isMoving: boolean;
  mouseOver: boolean;
  shapesVertexArray: { x; y }[];
  canvasImo: Canvasimo;
  vertexArraySource: Vertex[];
  strokePathColor = '#2C3DD4';
  fillPathColor = 'rgba(44, 61, 212, 0.4)';

  constructor(vertexArray: Vertex[], canvasImo: Canvasimo) {
    this.canvasImo = canvasImo;
    this.vertexArraySource = vertexArray;
    console.log(this.vertexArraySource);
  }

  initArray = () => {
    const a = this.vertexArraySource.map(({ x, y }: Vertex) => {
      return { x, y };
    });
    a.push(a[0]);

    return a;
  };

  renderShape = () => {
    const shapesVertexArray = this.initArray();
    this.canvasImo.setStrokeWidth(1);
    this.canvasImo.strokeClosedPath(shapesVertexArray, this.strokePathColor);
  };

  renderPath = () => {
    const shapesVertexArray = this.initArray();
    this.canvasImo.fillClosedPath(shapesVertexArray, this.fillPathColor);
  };

  render = () => {
    this.renderShape();
    this.renderPath();
  };
}
