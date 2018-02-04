// @flow
import * as React from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import type { DetectedLabel } from 'src/services/deepomatic/types';
import Card, { CardContent, CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import messages from 'src/messages';
import * as actions from '../actions';
import style from './style.scss';

type ComponentProps = {
  +backward: boolean;
  +openConfig: () => void;
}

type StateProps = {
  +detectedLabels: DetectedLabel[];
  +overKey: string;
}

type DispatchProps = {
  +overItem: (key: string) => void;
  +leaveItem: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

function ResultCard(props: Props) {
  const {
    backward, detectedLabels, openConfig,
    overKey,
    overItem, leaveItem,
  } = props;

  const cardDepth = backward ? 1 : 0;
  const oneKeyIsOver = !!overKey;

  return (
    <Card depth={cardDepth}>
      <CardContent>
        <CardTitle>{messages.DETECTION_RESULTS}</CardTitle>

        <span className={style.listTitle}>{messages.DETECTED_ITEMS}</span>
        <ul className={style.list}>
          {detectedLabels.map((detectedlabel) => {
            const onEnter = () => overItem(detectedlabel.label);
            const itemIsHidden = oneKeyIsOver && overKey !== detectedlabel.label;
            const itemClass = classnames(style.item, {
              [style.item_hidden]: itemIsHidden,
            });
            return (
              <li
                key={detectedlabel.label}
                onMouseEnter={onEnter}
                onFocus={onEnter}
                onMouseLeave={leaveItem}
                onBlur={leaveItem}
                className={itemClass}
              >
                <span>-</span>{detectedlabel.label} (x{detectedlabel.count})
              </li>
            );
          })}
        </ul>

        <CardButtons>
          <Button onClick={openConfig} isPrimary className={style.configButton}>
            {messages.CHANGE_CONFIGURATION}
          </Button>
        </CardButtons>
      </CardContent>
    </Card>
  );
}

function mapStateToProps(state: State): StateProps {
  return {
    detectedLabels: state.result.detectedLabels,
    overKey: state.result.overKey,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({
    overItem: actions.overDetectedKey,
    leaveItem: actions.leaveDetectedKey,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard);
