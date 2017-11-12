// @flow
import * as React from 'react';
import WelcomeCard from './WelcomeCard';
import SelectTypeCard from './SelectTypeCard';
import SelectFileCard from './SelectFileCard';
// import style from './style.scss';

type Props = {}

type State = {
  currentStep: number;
  detectionType: string;
  uploadType: 'url' | 'file' | '';
  imageUrl: string;
}

class FormCards extends React.PureComponent<Props, State> {
  static defaultProps = {}
  onChangeTypeBind: (name: string, value: boolean) => void
  onChangeUploadTypeBind: (value: 'left' | 'right') => void
  onChangeImageUrlBind: (value: string) => void
  nextStepBind: () => void
  previousStepBind: () => void
  submitBind: () => void
  state = {
    currentStep: 0,
    detectionType: '',
    uploadType: '',
    imageUrl: '',
  }

  constructor(props: Props) {
    super(props);

    this.nextStepBind = this.nextStep.bind(this);
    this.onChangeTypeBind = this.onChangeType.bind(this);
    this.onChangeUploadTypeBind = this.onChangeUploadType.bind(this);
    this.onChangeImageUrlBind = this.onChangeImageUrl.bind(this);
    this.previousStepBind = this.previousStep.bind(this);
    this.submitBind = this.submit.bind(this);
  }

  onChangeType(name: string, becomeChecked: boolean) {
    const detectionType = becomeChecked
      ? name
      : '';
    this.setState(() => ({ detectionType }));
  }

  onChangeUploadType(value: 'left' | 'right') {
    const isUrl = value === 'left';
    const uploadType = isUrl ? 'url' : 'file';
    this.setState(() => ({ uploadType }));
  }

  onChangeImageUrl(value: string) {
    this.setState(() => ({ imageUrl: value }));
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
    const {
      currentStep,
      detectionType,
      uploadType,
      imageUrl,
    } = this.state;

    return (
      <div>
        <WelcomeCard depth={currentStep} onStart={this.nextStepBind} />
        <SelectTypeCard
          depth={currentStep - 1}
          show={currentStep > 0}
          selected={detectionType}
          onChange={this.onChangeTypeBind}
          onNext={this.nextStepBind}
          onPrev={this.previousStepBind}
        />
        <SelectFileCard
          depth={currentStep - 2}
          show={currentStep > 1}
          uploadType={uploadType}
          onChangeUploadType={this.onChangeUploadTypeBind}
          imageUrl={imageUrl}
          onChangeImageUrl={this.onChangeImageUrlBind}
          onNext={this.submitBind}
          onPrev={this.previousStepBind}
        />
      </div>
    );
  }
}

export default FormCards;
