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
  wrapperRef: HTMLDivElement;

  componentDidMount() {
    canvasController
      .createCanvas(this.canvasRef)
      .setContainerSize(this.wrapperRef);
  }

  handleCropSubmit = () => {
    canvasController.cropImage()
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
            height={canvasController.canvasTemplateHeight}
            width={canvasController.canvasTemplateWidth}
          />
          <span>{fileManager.blobLoaded}</span>
        </EditorWrapper>
      </div>
    );
  }
}
