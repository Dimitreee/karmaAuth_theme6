import * as React from 'react';
import AppBar from 'material-ui/AppBar';

export class HeaderComponent extends React.Component {
  render() {
    return (
      <AppBar
        title="Karma Doc's Reader"
        style={{ backgroundColor: '#b83331' }}
        iconClassNameLeft={undefined}
      />
    );
  }
}
