// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import Card, { CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import messages from 'src/messages';
// import style from './style.scss';

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
      <Card>
        <CardTitle>{messages.DETECTION_RESULTS}</CardTitle>

        <span>{messages.DETECTED_ITEMS}</span>
        <ul>
          {detectedObjects.map(object => <li key={object}>{object}</li>)}
        </ul>

        <CardButtons>
          <Button onClick={() => console.log('change config')} isPrimary>
            {messages.CHANGE_CONFIGURATION}
          </Button>
        </CardButtons>
      </Card>
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
