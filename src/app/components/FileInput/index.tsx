import * as React from 'React';
import { InputWrapper } from './components';
import FileInputComponent from 'react-file-input-previews-base64';

export default class FileReader extends React.Component<any, any> {
  render() {
    return (
      <InputWrapper>
        <FileInputComponent
          labelStyle={{ fontSize: 14 }}
          multiple={false}
          callbackFunction={(file_arr) => {
            const { base64 } = file_arr;
            this.props.callback(base64);
          }}
          accept="image/*"
        />
      </InputWrapper>
    );
  }
}
