import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Root extends React.Component<any, any> {
  render() {
    return (
      <MuiThemeProvider>
        <div>{this.props.children}</div>
      </MuiThemeProvider>
    );
  }
}
