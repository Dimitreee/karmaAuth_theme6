import * as React from 'react';
import { observer } from 'mobx-react';
import ApiService from '../../utils/ApiService';
import { Header } from '../../components/Header';
import VerticalStepper from '../../components/VerticalStepper';

import { Wrapper, Body } from './components';

@observer
export class MainScreen extends React.Component<any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Wrapper>
        <Header />
        <Body>
          <VerticalStepper apiService={ApiService} />
        </Body>
      </Wrapper>
    );
  }
}
