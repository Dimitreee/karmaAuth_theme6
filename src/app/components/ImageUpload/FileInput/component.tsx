import * as React from 'react';
import { fileManager } from 'app/utils';

import { InputWrapper, LoadTitle } from '../index';
import { LibraryAddIcon } from 'app/components/Icons';

export class FileInput extends React.Component {
  fileInputElement;

  imageLoadedHandler = (e) => {
    e.stopPropagation();
    const img = e.target.files[0];
    fileManager.loadImage(img);
  };

  triggerClick = () => {
    this.fileInputElement && this.fileInputElement.click();
  };

  render() {
    return (
      <InputWrapper onClick={this.triggerClick}>
        <LoadTitle>Please upload document photo</LoadTitle>
        <LibraryAddIcon scale={3} />
        <input
          ref={(input) => (this.fileInputElement = input)}
          type="file"
          onChange={this.imageLoadedHandler}
          accept=".png, .jpg, .jpeg"
        />
      </InputWrapper>
    );
  }
}
