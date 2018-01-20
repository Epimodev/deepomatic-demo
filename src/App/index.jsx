// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { State } from 'src/store';
import FormCards from 'src/views/FormCards';
import DetectionResults from 'src/views/DetectionResults';
import style from './style.scss';

type StateProps = {
  onboardingFinished: boolean;
}

function App(props: StateProps) {
  const { onboardingFinished } = props;

  return (
    <div className={style.container}>
      <FormCards show={!onboardingFinished} />
      <DetectionResults show={onboardingFinished} />
    </div>
  );
}

function mapStateToProps(state: State) {
  return {
    onboardingFinished: state.configuration.onboardingFinished,
  };
}

function mapDispatchToProps() { return {}; }

export default connect(mapStateToProps, mapDispatchToProps)(App);
