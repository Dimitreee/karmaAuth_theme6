import * as React from 'react';
import { observer } from 'mobx-react';

import { Wrapper, Container } from './index';
import { HeaderComponent, ImageUploadComponent } from 'app/components';

@observer
export class MainScreen extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  loadHandler = () => {
    console.log('callbackif');
  };

  render() {
    return (
      <Wrapper>
        <HeaderComponent />
        <Container>
          <ImageUploadComponent callback={this.loadHandler} />
        </Container>
      </Wrapper>
    );
  }
}
