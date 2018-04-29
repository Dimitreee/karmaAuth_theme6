import * as React from 'React';
import { observer } from 'mobx-react';

import { action } from 'mobx';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import { RowWrapper, FormWrapper } from './componenets';

const style = {
  marginLeft: 20,
  marginRight: 20,
  width: '92%'
};

@observer
export class ResultForm extends React.Component<any, any> {
  formData: {} = {};
  constructor(props) {
    super(props);
    this.formData = this.props.data;
  }

  @action.bound
  handleChange = (event, rowType) => {
    this.formData[rowType] = event.target.value;
  };

  render() {
    if (this.props.data !== undefined) {
      return (
        <FormWrapper>
          <Paper zDepth={2}>
            {Object.keys(this.props.data).map((fieldName: string, index) => (
              <RowWrapper key={index}>
                <TextField
                  style={style}
                  floatingLabelText={fieldName}
                  value={this.formData[fieldName]}
                  onChange={(e) => this.handleChange(e, fieldName)}
                />
              </RowWrapper>
            ))}
          </Paper>
        </FormWrapper>
      );
    } else {
      return ``;
    }
  }
}
