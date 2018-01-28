// @flow
import * as React from 'react';
import classnames from 'classnames';
import Transition from 'src/components/no-design/Transition';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import type { DetectedLabel } from 'src/services/deepomatic/types';
import AppLoader from 'src/components/AppLoader';
import messages from 'src/messages';
import PreviewArea from './PreviewArea';
import ResultsCard from './ResultsCard';
import ConfigCard from './ConfigCard';
import * as actions from './actions';
import style from './style.scss';

type ComponentProps = {
  show: boolean;
}

type StateProps = {
  +configIsDisplayed: boolean;
  +isDetecting: boolean;
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
    show, configIsDisplayed, detectedLabels, isDetecting, openConfig,
  } = props;

  const partsClass = classnames(style.parts, {
    [style.parts_overlayed]: isDetecting,
  });

  return (
    <Transition
      in={show}
      classNames={TRANSITION_CLASSNAMES}
      timeout={800}
    >
      <div className={style.container}>
        <div className={partsClass}>
          <div className={style.previewPart}>
            <PreviewArea />
          </div>
          <div className={style.resultsPart}>
            <ResultsCard hidden={configIsDisplayed} openConfig={openConfig} />
            <ConfigCard show={configIsDisplayed} />
          </div>
        </div>
        <AppLoader show={isDetecting} message={messages.ANALYSING_IMAGE} />
      </div>
    </Transition>
  );
}

DetectionResults.defaultProps = {};

function mapStateToProps(state: State): StateProps {
  return {
    configIsDisplayed: state.result.configIsDisplayed,
    detectedObjects: Object.keys(state.result.boxes),
    isDetecting: state.configuration.isDetecting,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({
    openConfig: actions.showResultConfig,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetectionResults);
