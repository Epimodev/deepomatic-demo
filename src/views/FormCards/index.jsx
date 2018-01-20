// @flow
import * as React from 'react';
import Transition from 'src/components/no-design/Transition';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import WelcomeCard from './WelcomeCard';
import SelectTypeCard from './SelectTypeCard';
import SelectFileCard from './SelectFileCard';
import * as actions from './actions';
import style from './style.scss';

type ComponentProps = {
  +show: boolean;
}

type StateProps = {
  +currentStep: number;
}

type DispatchProps = {
  nextStep: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

const TRANSITION_CLASSNAMES = {
  enter: '',
  enterActive: '',
  exit: style.containerExit,
  exitActive: style.containerExitActive,
};

function FormCards(props: Props) {
  const {
    show,
    currentStep,
    nextStep,
  } = props;

  return (
    <Transition
      in={show}
      classNames={TRANSITION_CLASSNAMES}
      timeout={800}
    >
      <div className={style.container}>
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
    </Transition>
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
