import * as React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const LoadingIndicator = () => (
  <RefreshIndicator
    size={70}
    left={200}
    top={40}
    status="loading"
    color={'#000000'}
  />
);

export default LoadingIndicator;
