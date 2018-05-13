import * as React from 'react';
import { observer } from 'mobx-react/custom';
import { fileManager } from 'app/utils';

import { UploadWrapper, FileInput, ImageEditorComponent } from './index';

@observer
export class ImageUploadComponent extends React.Component {
  render() {
    return (
      <UploadWrapper>
        {fileManager.blobLoaded ? <ImageEditorComponent /> : <FileInput />}
      </UploadWrapper>
    );
  }
}
