// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import WelcomeCard from './WelcomeCard';
import SelectTypeCard from './SelectTypeCard';
import SelectFileCard from './SelectFileCard';
import * as actions from './actions';
import type { UploadType } from './types';

type ComponentProps = {}

type StateProps = {
  +currentStep: number;
  +detectionType: string;
  +uploadType: UploadType | '';
  +imageUrl: string;
}

type DispatchProps = {
  changeType: (name: string, becomeChecked: boolean) => void;
  changeUploadType: (value: 'left' | 'right') => void;
  changeImageUrl: (value: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  submit: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

function FormCards(props: Props) {
  const {
    currentStep,
    detectionType,
    uploadType,
    imageUrl,
    changeType,
    changeUploadType,
    changeImageUrl,
    nextStep,
    previousStep,
    submit,
  } = props;

  return (
    <div>
      <WelcomeCard depth={currentStep} onStart={nextStep} />
      <SelectTypeCard
        depth={currentStep - 1}
        show={currentStep > 0}
        selected={detectionType}
        onChange={changeType}
        onNext={nextStep}
        onPrev={previousStep}
      />
      <SelectFileCard
        depth={currentStep - 2}
        show={currentStep > 1}
        uploadType={uploadType}
        onChangeUploadType={changeUploadType}
        imageUrl={imageUrl}
        onChangeImageUrl={changeImageUrl}
        onNext={submit}
        onPrev={previousStep}
      />
    </div>
  );
}

function mapStateToProps(state: State): StateProps {
  return state.configuration;
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({
    changeType: actions.changeType,
    changeUploadType: actions.changeUploadType,
    changeImageUrl: actions.changeImageUrl,
    nextStep: actions.nextStep,
    previousStep: actions.previousStep,
    submit: actions.submitConfiguration,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCards);
