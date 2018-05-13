import { IMAGE_RECOGNIZE_PATH } from 'app/constants';
import { action, observable, runInAction } from 'mobx';
import { FormData } from 'app/models';

export class ApiService {
  @observable isLoading: boolean = false;
  @observable dataLoaded: boolean = false;
  formData: {} = {};
  observableFormData = new FormData(this.formData);
  @observable blobLoadedData = undefined;
  constructor() {}

  @action.bound
  recognizeImage = (blobData) => {
    this.toggleLoader();
    const requestData = {
      image: blobData
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
        const parsedResponse = JSON.parse(response);
        const passData = parsedResponse.data;

        runInAction(() => {
          this.dataLoaded = true;
          Object.keys(passData).forEach((key) => {
            this.formData[key].value = passData[key];
          });

          this.toggleLoader();
        });
      });
  };

  @action.bound
  toggleLoader = () => {
    this.isLoading = !this.isLoading;
  };
}

export default new ApiService();
