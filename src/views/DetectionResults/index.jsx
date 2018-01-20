// @flow
import * as React from 'react';
import Transition from 'src/components/no-design/Transition';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import ResultsCard from './ResultsCard';
import ConfigCard from './ConfigCard';
import * as actions from './actions';
import style from './style.scss';

type ComponentProps = {
  show: boolean;
}

type StateProps = {
  +configIsDisplayed: boolean;
  +detectedObjects: string[];
}

type DispatchProps = {
  +openConfig: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

const TRANSITION_CLASSNAMES = {
  enter: style.containerEnter,
  enterActive: style.containerEnterActive,
  exit: '',
  exitActive: '',
};

function DetectionResults(props: Props) {
  const {
    show, configIsDisplayed, detectedObjects, openConfig,
  } = props;

  return (
    <Transition
      in={show}
      classNames={TRANSITION_CLASSNAMES}
      timeout={800}
    >
      <div className={style.container}>
        <ResultsCard
          hidden={configIsDisplayed}
          containerClass={style.cardContainer}
          detectedObjects={detectedObjects}
          openConfig={openConfig}
        />
        <ConfigCard
          show={configIsDisplayed}
          containerClass={style.cardContainer}
        />
      </div>
    </Transition>
  );
}

DetectionResults.defaultProps = {};

function mapStateToProps(state: State): StateProps {
  return {
    configIsDisplayed: state.result.configIsDisplayed,
    detectedObjects: Object.keys(state.result.boxes),
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({
    openConfig: actions.showResultConfig,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetectionResults);
