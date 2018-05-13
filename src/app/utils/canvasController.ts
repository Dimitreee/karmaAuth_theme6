import { Canvasimo } from 'canvasimo';
import { action, computed, observable, reaction } from 'mobx';
import { fileManager, canvasDrawer, apiService } from './index';

export class CanvasController {
  canvasDrawer: canvasDrawer;

  @observable canvas: Canvasimo;
  @observable canvasHelper: Canvasimo;
  @observable image: HTMLImageElement;
  @observable helperImage: HTMLImageElement;
  @observable fullSizeToggled: boolean = false;

  @observable
  sourceImageSize: { width: number; height: number } = { width: 1, height: 1 };
  @observable
  containerSize: { width: number; height: number } = { width: 1, height: 1 };

  constructor() {
    reaction(() => this.containerSize, () => this.setImage());
    reaction(() => this.canvasTemplateSize, () => this.initDrawer());
  }

  @computed
  get widthToHeightRatio() {
    return this.sourceImageSize.width / this.sourceImageSize.height;
  }

  @computed
  get heightToWidthRatio() {
    return this.sourceImageSize.height / this.sourceImageSize.width;
  }

  @computed
  get canvasTemplateHeight() {
    let height = 0;

    if (this.sourceImageSize.height > this.sourceImageSize.width) {
      height = this.containerSize.height;
    } else {
      height = this.sourceImageSize.height * this.heightToWidthRatio;
    }

    return height;
  }

  @computed
  get canvasTemplateWidth() {
    return this.canvasTemplateHeight * this.widthToHeightRatio;
  }

  @computed
  get canvasTemplateSize() {
    return {
      height: this.canvasTemplateHeight,
      width: this.canvasTemplateWidth
    };
  }

  @action.bound
  createCanvas(canvas, canvasHelper) {
    this.canvas = new Canvasimo(canvas);
    this.canvasHelper = new Canvasimo(canvasHelper);
    return this;
  }

  @action.bound
  setContainerSize(wrapper) {
    const { width, height } = wrapper.getBoundingClientRect();
    this.containerSize = { width: width - 5, height: height - 5 };
    return this;
  }

  @action.bound
  setSourceImageSize({ width, height }) {
    this.sourceImageSize = { width, height };
  }

  @action.bound
  async setImage() {
    this.image = await fileManager.createImage();
    const { width, height } = this.image;
    this.setSourceImageSize({ width, height });
  }

  @action.bound
  async setHelperImage() {
    this.helperImage = await fileManager.createImage();
  }

  initDrawer() {
    this.canvas
      .setSize(this.canvasTemplateSize)
      .setFill('black')
      .setStroke('black')
      .setStrokeWidth(1);

    this.canvasDrawer = new canvasDrawer(
      this.canvas,
      this.canvasHelper,
      this.image,
      this.canvasTemplateWidth,
      this.canvasTemplateHeight
    );

    reaction(
      () => this.canvasDrawer.croppedData,
      (data) => apiService.recognizeImage(data)
    );
  }

  cropImage = () => {
    this.canvasDrawer.stopRender();
  };

  @action.bound
  toggleFullSizeShape = () => {
    this.fullSizeToggled = !this.fullSizeToggled;
    this.canvasDrawer.toggleShapeSize(this.fullSizeToggled);
  };
}
