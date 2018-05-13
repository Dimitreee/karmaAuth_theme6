import * as React from 'react';
import { fileManager, canvasController } from 'app/utils';
import { observer } from 'mobx-react/custom';
import { EditorWrapper } from './index';
import { LoadButtonComponent } from 'app/components';
import { FitToImageButtonComponent } from 'app/components';

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

  handleCropAction = () => {
    canvasController.cropImage();
  };

  handleFullScreen = () => {
    canvasController.toggleFullSizeShape()
  };

  render() {
    return (
      <div
        style={{ display: 'flex', flex: '1', position: 'relative' }}
        ref={(wrapper) => (this.wrapperRef = wrapper)}
      >
        <FitToImageButtonComponent clickHandler={this.handleFullScreen} />
        <LoadButtonComponent clickHandler={this.handleCropAction} />
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
