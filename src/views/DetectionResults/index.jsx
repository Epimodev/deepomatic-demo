// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import ResultsCard from './ResultsCard';
import style from './style.scss';

type ComponentProps = {}

type StateProps = {
  +detectedObjects: string[];
}

type DispatchProps = {}

type Props = ComponentProps & StateProps & DispatchProps

function DetectionResults(props: Props) {
  const { detectedObjects } = props;

  return (
    <div>
      <ResultsCard detectedObjects={detectedObjects} containerClass={style.cardContainer} />
    </div>
  );
}

DetectionResults.defaultProps = {};

function mapStateToProps(state: State): StateProps {
  return {
    detectedObjects: Object.keys(state.result.boxes),
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetectionResults);
