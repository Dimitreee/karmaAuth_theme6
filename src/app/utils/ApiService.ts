import { IMAGE_CREATE_PATH, IMAGE_RECOGNIZE_PATH } from 'app/constants';
import { action, observable, extendObservable, runInAction } from 'mobx';
import { ImageService } from './ImageService';

export class ApiService {
  @observable isLoading: boolean = false;
  @observable
  responseData: { id: number; passport_image_path: string } = undefined;
  formData: {} = {};
  observableFormData = new formData(this.formData);
  imageService = new ImageService();
  @observable blobLoadedData = undefined;
  constructor() {}

  @action.bound
  loadImage = (blobData) => {
    this.blobLoadedData = blobData;
    this.toggleLoader();
    const requestData = {
      passport_image: blobData
    };

    fetch(IMAGE_CREATE_PATH, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.text())
      .then(this.responseHandler);
  };

  @action.bound
  recognizeImagePart = (blobData, rowName) => {
    const { id } = this.responseData;

    const requestData = {
      part_image: blobData,
      image_id: id
    };

    fetch(IMAGE_RECOGNIZE_PATH, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.text())
      .then((response) => {
        const data = JSON.parse(response);
        runInAction(() => {
          this.formData[rowName] = data.txt;
        });
      });
  };

  @action.bound
  responseHandler = (data) => {
    this.toggleLoader();
    this.responseData = JSON.parse(data);
    this.imageService.processImage(
      this.blobLoadedData,
      this.recognizeImagePart
    );
  };

  @action.bound
  resetformData = () => {
    this.formData = {
      'Код подразделения': '',
      'Дата выдачи': '',
      'Орган выдавший документ': '',
      Имя: '',
      Фамилия: '',
      Отчество: ''
    };
  };

  @action.bound
  toggleLoader = () => {
    this.isLoading = !this.isLoading;
  };
}

const formData = (formData) => {
  extendObservable(formData, {
    'Код подразделения': '',
    'Дата выдачи': '',
    'Орган выдавший документ': '',
    Имя: '',
    Фамилия: '',
    Отчество: ''
  });
};

export default new ApiService();
