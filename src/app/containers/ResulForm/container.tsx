import * as React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import { apiService } from 'app/utils';

import { Wrapper, FormWrapper } from './index';
import { observer } from 'mobx-react/custom';

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
  render() {
    return (
      <FormWrapper>
        <Paper zDepth={2}>
          {Object.keys(apiService.formData).map((fieldName: string, index) => (
            <Wrapper key={index}>
              <TextField
                style={style}
                floatingLabelText={apiService.formData[fieldName].name}
                value={apiService.formData[fieldName].value}
              />
            </Wrapper>
          ))}
        </Paper>
      </FormWrapper>
    );
  }
}
