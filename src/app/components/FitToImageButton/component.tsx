import * as React from 'react';
import { ButtonWrapper } from './index';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import OpenWith from 'material-ui/svg-icons/action/open-with';

const style = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'rgb(184, 51, 49)'
  }
};

export class FitToImageButtonComponent extends React.Component<{
  clickHandler: () => void;
}> {
  render() {
    return (
      <ButtonWrapper>
        <FloatingActionButton
          style={style}
          backgroundColor="rgb(184, 51, 49)"
          onClick={this.props.clickHandler}
        >
          <OpenWith />
        </FloatingActionButton>
      </ButtonWrapper>
    );
  }
}
