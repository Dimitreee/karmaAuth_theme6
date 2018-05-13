import 'tracking';
declare var CannyJS;

class ImageRecognizer {
  recognizeImage(imageData, width, height, canvasImo) {
    (<any>window).fastThreshold = 50;

    const image = new Image();

    canvasImo.drawImage(image, 0, 0, image.width / 4, image.height / 4);

    (<any>window).tracking.Fast.THRESHOLD = (<any>window).fastThreshold;

    canvasImo.getContext('2d').clearRect(0, 0, width, height);
    canvasImo.getContext('2d').putImageData(imageData, 0, 0);

    imageData = CannyJS.canny(canvasImo.getCanvas());
    imageData.drawOn(canvasImo.getCanvas());

    const bitmapData = canvasImo
      .getCanvas()
      .getContext('2d')
      .getImageData(0, 0, canvasImo.getWidth(), canvasImo.getWidth()).data;

    console.log(bitmapData.length);
  }

  findContour(float32Array: Float32Array) {
    for (let i = 0; i < float32Array.length; i++) {}
    // let arrays = [],
    //   size = 4;

    // while (float32Array.length > 0) arrays.push(float32Array.splice(0, size));

    console.log(float32Array.buffer);
  }

  base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}

export default new ImageRecognizer();
