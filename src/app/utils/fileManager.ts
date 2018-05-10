import { action, observable } from 'mobx';

export class FileManager {
  @observable imgBlob;
  @observable blobLoaded: boolean = false;
  fileReader = new FileReader();

  @action
  loadImage(imgFile: any) {
    const imgLoader = new Promise((resolve, reject) => {
      this.fileReader.onerror = () => {
        this.fileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      this.fileReader.onload = () => {
        resolve(this.fileReader.result);
      };

      this.fileReader.readAsDataURL(imgFile);
    });

    imgLoader.then(this.handleImgBase64);
  }

  @action.bound
  handleImgBase64 = (imgBase64: string) => {
    const [base64] = imgBase64.split(',').slice(-1);
    this.imgBlob = FileManager.b64toBlob(base64);
    this.blobLoaded = true;
  };

  createImage(): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const imageUrl = URL.createObjectURL(this.imgBlob);
      const image = new Image();

      image.src = imageUrl;
      image.onload = () => {
        resolve(image);
      };
    });
  }

  static b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
}
