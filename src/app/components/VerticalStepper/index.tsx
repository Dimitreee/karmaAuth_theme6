import * as React from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { ResultForm } from '../../components/ResultsForm';
import FileReader from '../../components/FileInput';
import LoadingIndicator from '../../components/Loader';

import TypeSelect from '../../components/TypeSelect/';

import {
  StepButtonsWrapper,
  StepContentContainer,
  SuccessMessage
} from './components';
import { observer } from 'mobx-react';

@observer
class VerticalLinearStepper extends React.Component<any> {
  state = {
    finished: false,
    stepIndex: 0
  };

  fileLoadHandler = (blob) => {
    this.props.apiService.loadImage(blob);
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  renderStepActions(step) {
    const { stepIndex } = this.state;

    return (
      <StepButtonsWrapper>
        <RaisedButton
          label={stepIndex === 2 ? 'Оставить заявку' : 'Продолжить'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          disabled={
            stepIndex === 1 &&
            !this.props.apiService.blobLoadedData &&
            !this.props.apiService.isLoading
          }
          primary={true}
          onClick={this.handleNext}
        />
        {step > 0 && (
          <FlatButton
            label="Назад"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
      </StepButtonsWrapper>
    );
  }

  render() {
    const { finished, stepIndex } = this.state;

    return (
      <div style={{ maxWidth: 500, maxHeight: 400, marginBottom: 100 }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Выберите тип документа</StepLabel>
            <StepContent style={{ overflow: 'visible' }}>
              <StepContentContainer>
                <TypeSelect />
              </StepContentContainer>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Загрузите фото документа</StepLabel>
            <StepContent>
              <StepContentContainer>
                <div>
                  <RaisedButton containerElement="label" label="Выберите файл">
                    <FileReader callback={this.fileLoadHandler} />
                  </RaisedButton>
                </div>
                {this.props.apiService.isLoading && <LoadingIndicator />}
                {this.props.apiService.blobLoadedData && (
                  <SuccessMessage>Документ обработан</SuccessMessage>
                )}
              </StepContentContainer>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Проверьте данные на корректность</StepLabel>
            <StepContent>
              <StepContentContainer>
                <ResultForm data={this.props.apiService.formData} />
              </StepContentContainer>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{ margin: '20px 0', textAlign: 'center' }}>
            Заявка оставлена
            <br />
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.props.apiService.resetformData();
                this.setState({ stepIndex: 0, finished: false });
              }}
            >
              Повторить?
            </a>{' '}
          </p>
        )}
      </div>
    );
  }
}

export default VerticalLinearStepper;
