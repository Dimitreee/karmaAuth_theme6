import * as React from 'react';
import { fileManager, canvasController } from 'app/utils';
import { observer } from 'mobx-react/custom';
import { EditorWrapper } from './index';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';

const style = {
  position: 'absolute',
  bottom: 10,
  right: 40
};

@observer
export class ImageEditorComponent extends React.Component {
  canvasRef: HTMLCanvasElement;
  canvasHelperRef: HTMLCanvasElement;
  wrapperRef: HTMLDivElement;

  componentDidMount() {
    canvasController
      .createCanvas(this.canvasRef, this.canvasHelperRef)
      .setContainerSize(this.wrapperRef);
  }

  handleCropSubmit = () => {
    canvasController.cropImage();
  };

  render() {
    return (
      <div
        style={{ display: 'flex', flex: '1', position: 'relative' }}
        ref={(wrapper) => (this.wrapperRef = wrapper)}
      >
        <FloatingActionButton
          style={style}
          backgroundColor="rgb(184, 51, 49)"
          onClick={this.handleCropSubmit}
        >
          <ImageEdit />
        </FloatingActionButton>
        <EditorWrapper>
          <canvas
            ref={(canvas) => (this.canvasRef = canvas)}
            height={canvasController.canvasTemplateHeight + 'px'}
            width={canvasController.canvasTemplateWidth + 'px'}
          />
          <span>{fileManager.blobLoaded}</span>
        </EditorWrapper>
        <canvas
          ref={(canvas) => (this.canvasHelperRef = canvas)}
          width={canvasController.sourceImageSize.width + 'px'}
          height={canvasController.sourceImageSize.height + 'px'}
          style={{ display: 'none' }}
        />
      </div>
    );
  }
}
