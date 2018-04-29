import * as React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 16
  }
};

export default class TypeSelect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { value: 1 };
  }

  handleChange = (event, index, value) => this.setState({ value });
  render() {
    return (
      <RadioButtonGroup
        name="shipSpeed"
        defaultSelected="not_light"
        style={{ overflow: 'visible' }}
      >
        <RadioButton value="1" label="Паспорт" style={styles.radioButton} />
        <RadioButton
          disabled={true}
          value="2"
          label="Выписку из ЕГРН на недвижимость"
          style={styles.radioButton}
        />
        <RadioButton
          disabled={true}
          value="3"
          label="Кадастровый паспорт недвижимости"
          style={styles.radioButton}
        />
        <RadioButton
          disabled={true}
          value="4"
          label="Водительские права"
          style={styles.radioButton}
        />
        <RadioButton
          value="5"
          disabled={true}
          label="ПТС"
          style={styles.radioButton}
        />
        <RadioButton
          value="6"
          disabled={true}
          label="СТС"
          style={styles.radioButton}
        />
      </RadioButtonGroup>
    );
  }
}
