import * as React from 'react';
import { observer } from 'mobx-react';
import { apiService } from 'app/utils';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import { LoaderWrapper } from 'app/components/LoadButton';

const style = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'rgb(184, 51, 49)'
  }
};

@observer
export class LoadButtonComponent extends React.Component<{
  clickHandler: () => void;
}> {
  render() {
    return (
      <LoaderWrapper>
        {apiService.isLoading ? (
          <RefreshIndicator
            size={56}
            left={0}
            top={0}
            status="loading"
            style={style.refresh}
          />
        ) : (
          <FloatingActionButton
            style={style}
            backgroundColor="rgb(184, 51, 49)"
            onClick={this.props.clickHandler}
          >
            <ImageEdit />
          </FloatingActionButton>
        )}
      </LoaderWrapper>
    );
  }
}
