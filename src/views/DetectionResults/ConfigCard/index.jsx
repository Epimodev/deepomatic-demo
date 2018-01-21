// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import Card, { CardTitle, CardText, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import Checkbox from 'src/components/Checkbox';
import detectionTypes from 'src/constants/detectionTypes';
import messages from 'src/messages';
import * as actions from '../actions';
import * as formActions from '../../FormCards/actions';
import style from './style.scss';

type ComponentProps = {
  +show: boolean;
}

type StateProps = {
  +selectedType: string;
}

type DispatchProps = {
  +changeType: (name: string, value: boolean) => void;
  +changeUploadType: (value: 'left' | 'right') => void;
  +changeImageUrl: (value: string) => void;
  +changeFile: (file: File) => void;
  +hideConfig: () => void;
  +submit: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

function ConfigCard(props: Props) {
  const {
    show,
    selectedType,
    changeType, hideConfig, submit,
  } = props;

  return (
    <Card show={show}>
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
        <Button onClick={hideConfig}>
          {messages.CANCEL}
        </Button>
        <Button onClick={submit} isPrimary>
          {messages.RELAUNCH_DETECTION}
        </Button>
      </CardButtons>
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
    changeType: formActions.changeType,
    changeUploadType: formActions.changeUploadType,
    changeImageUrl: formActions.changeImageUrl,
    changeFile: formActions.changeFile,
    submit: formActions.submitConfiguration,
    hideConfig: actions.hideResultConfig,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigCard);
