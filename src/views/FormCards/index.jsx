// @flow
import * as React from 'react';
import WelcomeCard from './WelcomeCard';
import SelectTypeCard from './SelectTypeCard';
import SelectFileCard from './SelectFileCard';
// import style from './style.scss';

type Props = {}

type State = {
  currentStep: number;
}

class FormCards extends React.PureComponent<Props, State> {
  static defaultProps = {}
  nextStepBind: () => void
  previousStepBind: () => void
  submitBind: () => void
  state = {
    currentStep: 0,
  }

  constructor(props: Props) {
    super(props);

    this.nextStepBind = this.nextStep.bind(this);
    this.previousStepBind = this.previousStep.bind(this);
    this.submitBind = this.submit.bind(this);
  }

  nextStep() {
    this.setState(state => ({ currentStep: state.currentStep + 1 }));
  }

  previousStep() {
    this.setState(state => ({ currentStep: state.currentStep - 1 }));
  }

  submit() {
    console.log('Submit data');
  }

  render() {
    const { currentStep } = this.state;

    return (
      <div>
        <WelcomeCard depth={currentStep} onStart={this.nextStepBind} />
        <SelectTypeCard
          depth={currentStep - 1}
          show={currentStep > 0}
          onNext={this.nextStepBind}
          onPrev={this.previousStepBind}
        />
        <SelectFileCard
          depth={currentStep - 2}
          show={currentStep > 1}
          onNext={this.submitBind}
          onPrev={this.previousStepBind}
        />
      </div>
    );
  }
}

export default FormCards;
