import * as React from 'react';
import { observer } from 'mobx-react';

import { Wrapper, Container } from './index';
import { HeaderComponent, ImageUploadComponent } from 'app/components';
import { ResultForm } from 'app/containers';
import { apiService } from 'app/utils';

@observer
export class MainScreen extends React.Component<any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <HeaderComponent />
        <Container>
          {apiService.dataLoaded ? (
            <ResultForm data={apiService.observableFormData} />
          ) : (
            <ImageUploadComponent />
          )}
        </Container>
      </Wrapper>
    );
  }
}
