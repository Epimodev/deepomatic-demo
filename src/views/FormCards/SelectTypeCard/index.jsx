// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import Card, { CardContent, CardTitle, CardText, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import Checkbox from 'src/components/Checkbox';
import detectionTypes from 'src/constants/detectionTypes';
import messages from 'src/messages';
import * as actions from '../actions';
import style from './style.scss';

type ComponentProps = {
  +depth: number;
  +show: boolean;
}

type StateProps = {
  +selectedType: string;
}

type DispatchProps = {
  +changeType: (name: string, value: boolean) => void;
  +previousStep: () => void;
  +nextStep: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

function SelectTypeCard(props: Props) {
  const {
    depth, show, selectedType, changeType, nextStep, previousStep,
  } = props;

  const onNextClick = selectedType ? nextStep : null;

  return (
    <Card depth={depth} show={show}>
      <CardContent>
        <CardTitle>{messages.TYPE_TO_DETECT}</CardTitle>
        <CardText>{messages.WHAT_TYPE_DETECT}</CardText>

        <div className={style.types}>
          {detectionTypes.map(({ name, label, color }) => (
            <Checkbox
              key={name}
              name={name}
              checked={selectedType === name}
              color={color}
              onChange={changeType}
            >
              {label}
            </Checkbox>
          ))}
        </div>

        <CardButtons>
          <Button onClick={previousStep}>{messages.PREVIOUS}</Button>
          <Button onClick={onNextClick} isPrimary>{messages.NEXT}</Button>
        </CardButtons>
      </CardContent>
    </Card>
  );
}

function mapStateToProps(state: State): StateProps {
  return {
    selectedType: state.configuration.detectionType,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({
    changeType: actions.changeType,
    nextStep: actions.nextStep,
    previousStep: actions.previousStep,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTypeCard);
