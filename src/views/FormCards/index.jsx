// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import WelcomeCard from './WelcomeCard';
import SelectTypeCard from './SelectTypeCard';
import SelectFileCard from './SelectFileCard';
import * as actions from './actions';

type ComponentProps = {}

type StateProps = {
  +currentStep: number;
}

type DispatchProps = {
  nextStep: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

function FormCards(props: Props) {
  const {
    currentStep,
    nextStep,
  } = props;

  return (
    <div>
      <WelcomeCard depth={currentStep} onStart={nextStep} />
      <SelectTypeCard
        depth={currentStep - 1}
        show={currentStep > 0}
      />
      <SelectFileCard
        depth={currentStep - 2}
        show={currentStep > 1}
      />
    </div>
  );
}

function mapStateToProps(state: State): StateProps {
  return {
    currentStep: state.configuration.currentStep,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({
    nextStep: actions.nextStep,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCards);
