import Canvasimo from 'canvasimo';
import { helpers } from './index';

export class canvasDrawer {
  canvasSource: HTMLCanvasElement;
  canvasSource2: HTMLCanvasElement;
  canvasImo: Canvasimo;
  vertexArray: Vertex[];
  sourceImg: HTMLImageElement;
  templateWidth: number;
  templateHeight: number;
  mouseDown: boolean = false;
  renderig: boolean = false;
  drawQueue: [any];

  constructor(
    canvas: Canvasimo,
    sourceImg: HTMLImageElement,
    templateWidth: number,
    templateHeight: number
  ) {
    this.canvasImo = canvas;
    this.canvasSource = canvas.getCanvas();
    this.sourceImg = sourceImg;
    this.templateWidth = templateWidth;
    this.templateHeight = templateHeight;
    this.drawQueue = [this.renderImage];
    this.renderig = true;

    this.draw();
    this.addVertex();
    this.addListeners();
    this.pushToQueue(this.renderShape);
    this.pushToQueue(this.renderPath);
  }

  stopRender() {
    this.renderig = false;
  }

  processImage() {
    const shapesVertexArray = this.vertexArray.map(({ x, y }: Vertex) => {
      return { x, y };
    });

    const anchors = {
      TL: { ...shapesVertexArray[0] },
      TR: { ...shapesVertexArray[3] },
      BR: { ...shapesVertexArray[2] },
      BL: { ...shapesVertexArray[1] }
    };

    console.log({ ...anchors });

    const unwarped = {
      TL: { x: 0, y: 0 }, // tl
      TR: { x: 400, y: 0 }, // tr
      BR: { x: 400, y: 853 }, // br
      BL: { x: 0, y: 850 } // gold
    };

    this.renderImage();

    this.unwarp(anchors, unwarped, this.canvasSource.getContext('2d'));
  }

  unwarp(anchors, unwarped, context) {
    // clear the destination canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    // unwarp the bottom-left triangle of the warped polygon
    this.mapTriangle(
      context,
      anchors.TL,
      anchors.BR,
      anchors.BL,
      unwarped.TL,
      unwarped.BR,
      unwarped.BL
    );

    // eliminate slight space between triangles
    this.canvasSource.getContext('2d').translate(-1, 1);

    // unwarp the top-right triangle of the warped polygon
    this.mapTriangle(
      context,
      anchors.TL,
      anchors.TR,
      anchors.BR,
      unwarped.TL,
      unwarped.TR,
      unwarped.BR
    );
  }

  mapTriangle = (ctx, p0, p1, p2, p_0, p_1, p_2) => {
    // break out the individual triangles x's & y's
    const x0 = p_0.x,
      y0 = p_0.y;
    const x1 = p_1.x,
      y1 = p_1.y;
    const x2 = p_2.x,
      y2 = p_2.y;
    const u0 = p0.x,
      v0 = p0.y;
    const u1 = p1.x,
      v1 = p1.y;
    const u2 = p2.x,
      v2 = p2.y;

    // save the unclipped & untransformed destination canvas
    ctx.save();

    // clip the destination canvas to the unwarped destination triangle
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.clip();

    // Compute matrix transform
    const delta = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2;
    const delta_a = x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2;
    const delta_b = u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2;
    const delta_c =
      u0 * v1 * x2 +
      v0 * x1 * u2 +
      x0 * u1 * v2 -
      x0 * v1 * u2 -
      v0 * u1 * x2 -
      u0 * x1 * v2;
    const delta_d = y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2;
    const delta_e = u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2;
    const delta_f =
      u0 * v1 * y2 +
      v0 * y1 * u2 +
      y0 * u1 * v2 -
      y0 * v1 * u2 -
      v0 * u1 * y2 -
      u0 * y1 * v2;

    // Draw the transformed image
    ctx.transform(
      delta_a / delta,
      delta_d / delta,
      delta_b / delta,
      delta_e / delta,
      delta_c / delta,
      delta_f / delta
    );

    // draw the transformed source image to the destination canvas
    ctx.drawImage(this.sourceImg, 0, 0);

    // restore the context to it's unclipped untransformed state
    ctx.restore();
  };

  pushToQueue = (fn: () => void) => {
    this.drawQueue.push(fn);
  };

  draw = () => {
    this.renderig
      ? requestAnimationFrame(() => {
          this.drawQueue.forEach((func) => {
            func();
          });
          this.draw();
        })
      : this.processImage();
  };

  renderImage = () => {
    this.sourceImg.width = this.templateWidth;
    this.sourceImg.height = this.templateHeight;
    this.canvasImo.drawImage(
      this.sourceImg,
      0,
      0,
      this.templateWidth,
      this.templateHeight
    );
  };

  renderShape = () => {
    const shapesVertexArray = this.vertexArray.map(({ x, y }: Vertex) => {
      return { x, y };
    });

    shapesVertexArray.push(shapesVertexArray[0]);
    this.canvasImo.setStrokeWidth(1);
    this.canvasImo.strokeClosedPath(shapesVertexArray, '#2C3DD4');
  };

  renderPath = () => {
    const shapesVertexArray = this.vertexArray.map(({ x, y }: Vertex) => {
      return { x, y };
    });

    shapesVertexArray.push(shapesVertexArray[0]);
    this.canvasImo.fillClosedPath(shapesVertexArray, 'rgba(44, 61, 212, 0.4)');
  };

  addVertex = () => {
    const defaultVertexData = [
      { x: 100, y: 100 },
      { x: 100, y: 300 },
      { x: 300, y: 300 },
      { x: 300, y: 100 }
    ];

    this.vertexArray = defaultVertexData.map(
      ({ x, y }: { x: number; y: number }, index) =>
        new Vertex(this.canvasSource, this.canvasImo, x, y, index)
    );

    this.vertexArray.forEach((vertex: Vertex) => {
      this.pushToQueue(vertex.render);
    });
  };

  addListeners() {
    this.addMouseMoveListener();
    this.addMouseDownListener();
    this.addMouseUpListener();
  }

  addMouseMoveListener() {
    this.canvasSource.addEventListener('mousemove', this.handleVertexOver);
  }

  addMouseDownListener() {
    this.canvasSource.addEventListener('mousedown', () => {
      this.mouseDown = true;
    });
  }

  addMouseUpListener() {
    this.canvasSource.addEventListener('mouseup', () => {
      this.mouseDown = false;
    });
  }

  handleVertexOver = (e) => {
    const { x, y } = helpers.getRelativeCoordinates(e, this.canvasSource);
    this.vertexArray.forEach((vertex: Vertex) => {
      vertex.mouseMoveHandler(x, y, this.mouseDown);
    });
  };
}

class Vertex {
  x: number;
  y: number;
  color = '#12d400';
  radius = 10;
  canvasImo: Canvasimo;
  canvasSource: HTMLCanvasElement;
  index: number;
  mouseOver: boolean = false;

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
    if (this.mouseOverVertex(x, y)) {
      this.applyOverStyles();
      this.mouseOver = true;
      if (mouseDown) {
        this.x = x;
        this.y = y;
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
