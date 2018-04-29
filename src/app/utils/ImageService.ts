import loadImage from 'image-promise';

import {
  EXTRADITION_AGENCY,
  DATE_OF_ISSUE,
  UNIT_CODE,
  NAME,
  LAST_NAME,
  MIDDLE_NAME
} from './constants';

export class ImageService {
  parts: PartItem[] = [
    EXTRADITION_AGENCY,
    DATE_OF_ISSUE,
    UNIT_CODE,
    NAME,
    LAST_NAME,
    MIDDLE_NAME
  ];
  canvas = document.createElement('canvas');
  ctx = this.canvas.getContext('2d');
  img = undefined;

  constructor() {
    this.canvas.style.display = 'none';
    document.body.appendChild(this.canvas);
  }

  processImage(imageBlob, callback) {
    loadImage(imageBlob).then((img) => {
      this.img = img;

      const asyncPartsTreatment = this.parts.map((part) =>
        this.renderPart.bind(this, part, callback)
      );

      runAsyncSequence(asyncPartsTreatment);
    });
  }

  renderPart(partItem: PartItem, callback) {
    const { width: imgWidth, height: imgHeight } = this.img;
    const width = (partItem.x4 - partItem.x1) * imgWidth;
    const height = (partItem.y4 - partItem.y1) * imgHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx.drawImage(
      this.img,
      partItem.x1 * imgWidth,
      partItem.y1 * imgHeight,
      width,
      height,
      0,
      0,
      width,
      height
    );

    const img = this.canvas.toDataURL('image/jpeg');
    callback(img, partItem.name);
  }
}

type PartItem = {
  x1: number;
  y1: number;
  x4: number;
  y4: number;
  name: string;
};

async function runAsyncSequence(promises) {
  for (let promise of promises) {
    await promise();
  }
}
