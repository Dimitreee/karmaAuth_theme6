import Canvasimo from 'canvasimo';
// import { helpers, imageRecognizer } from './index';
import { helpers } from './index';

import { Vertex, Shape } from 'app/models';
import { observable, runInAction } from 'mobx';

export class canvasDrawer {
  canvasSource: HTMLCanvasElement;
  canvasHelperSource: HTMLCanvasElement;
  canvasImo: Canvasimo;
  canvasHelperImo: Canvasimo;
  vertexArray: Vertex[];
  shape: Shape;
  sourceImg: HTMLImageElement;
  templateWidth: number;
  templateHeight: number;
  mouseDown: boolean = false;
  renderig: boolean = false;
  drawQueue: [any];
  shapesVertexArray: { x: number; y: number }[];
  shapeBuffer: Vertex[];

  @observable croppedData: string;

  constructor(
    canvas: Canvasimo,
    canvasHelper: Canvasimo,
    sourceImg: HTMLImageElement,
    templateWidth: number,
    templateHeight: number
  ) {
    this.canvasImo = canvas;
    this.canvasHelperImo = canvasHelper;
    this.canvasSource = canvas.getCanvas();
    this.canvasHelperSource = canvasHelper.getCanvas();
    this.sourceImg = sourceImg;
    this.templateWidth = templateWidth;
    this.templateHeight = templateHeight;

    //
    // setTimeout(() => {
    //   this.renderImage();
    //   this.canvasImo.fillCircle(0, 0, 200);
    //   imageRecognizer.recognizeImage(
    //     this.canvasImo.getImageData(
    //       0,
    //       0,
    //       this.sourceImg.width,
    //       this.sourceImg.height
    //     ),
    //     this.sourceImg.width,
    //     this.sourceImg.height,
    //     this.canvasImo
    //   );
    // }, 0);

    this.drawQueue = [this.renderImage];

    this.renderig = true;
    this.draw();
    this.addVertex();
    this.addShape();
    this.addListeners();
  }

  stopRender() {
    this.renderig = false;
  }

  processImage() {
    const helperCtx = this.canvasHelperSource.getContext('2d');

    this.renderImage();
    this.renderShape();
    this.clipCroppedShape(helperCtx);
    this.renderHelperImage(helperCtx);

    runInAction(() => {
      this.croppedData = this.canvasHelperSource.toDataURL();
    });

    // debug
    // const img = new Image();
    // img.src = this.canvasHelperSource.toDataURL();
    // document.body.appendChild(img);
  }

  clipCroppedShape(helperCtx) {
    const restoredVertexArray = this.normalizeVertexArray();

    helperCtx.fillStyle = '#000';
    helperCtx.fillRect(0, 0, this.sourceImg.width, this.sourceImg.height);
    helperCtx.beginPath();
    helperCtx.moveTo(restoredVertexArray[0].x, restoredVertexArray[0].y - 4);

    for (let i = 1; i < restoredVertexArray.length; i++) {
      helperCtx.lineTo(restoredVertexArray[i].x, restoredVertexArray[i].y);
    }

    helperCtx.lineTo(restoredVertexArray[0].x, restoredVertexArray[0].y);

    helperCtx.strokeStyle = '#ff0000';
    helperCtx.lineWidth = 10;
    helperCtx.closePath();
    helperCtx.clip();
  }

  normalizeVertexArray = () => {
    const { width, height } = this.sourceImg;
    const widthRatio = width / this.canvasImo.getWidth();
    const heightRatio = height / this.canvasImo.getHeight();

    return this.shapesVertexArray.map(({ x, y }: Vertex) => {
      return { x: x * widthRatio, y: y * heightRatio };
    });
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
    this.canvasImo.drawImage(
      this.sourceImg,
      0,
      0,
      this.templateWidth,
      this.templateHeight
    );
  };

  renderHelperImage = (ctx) => {
    ctx.drawImage(
      this.sourceImg,
      0,
      0,
      this.sourceImg.width,
      this.sourceImg.height
    );
  };

  renderShape = () => {
    this.shapesVertexArray = this.vertexArray.map(({ x, y }: Vertex) => {
      return { x, y };
    });

    const shapesVertexArray = [...this.shapesVertexArray];
    shapesVertexArray.push(this.shapesVertexArray[0]);
    this.canvasImo.setStrokeWidth(1);
    this.canvasImo.strokeClosedPath(shapesVertexArray, '#2C3DD4');
  };

  toggleShapeSize = (fullSize: boolean) => {
    if (fullSize) {
      this.shapeBuffer = [...this.vertexArray];
      this.vertexArray[0].x = 0;
      this.vertexArray[0].y = 0;
      this.vertexArray[1].x = 0;
      this.vertexArray[1].y = this.templateHeight;
      this.vertexArray[2].x = this.templateWidth;
      this.vertexArray[2].y = this.templateHeight;
      this.vertexArray[3].x = this.templateWidth;
      this.vertexArray[3].y = 0;
    } else {
      this.vertexArray = [...this.shapeBuffer];
    }
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

  addShape = () => {
    this.shape = new Shape(this.vertexArray, this.canvasImo);
    this.pushToQueue(this.shape.render);
  };

  addListeners() {
    this.addMouseMoveListener();
    this.addMouseDownListener();
    this.addMouseUpListener();
  }

  addMouseMoveListener() {
    this.canvasSource.addEventListener('mousemove', this.handleElementOver);
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

  handleElementOver = (e) => {
    const { x, y } = helpers.getRelativeCoordinates(e, this.canvasSource);
    this.vertexArray.forEach((vertex: Vertex) => {
      vertex.mouseMoveHandler(x, y, this.mouseDown);
    });
  };
}
