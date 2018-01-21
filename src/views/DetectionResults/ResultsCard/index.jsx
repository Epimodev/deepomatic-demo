// @flow
import * as React from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import Card, { CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import messages from 'src/messages';
import * as actions from '../actions';
import style from './style.scss';

type ComponentProps = {
  +hidden: boolean;
  +detectedObjects: string[];
  +openConfig: () => void;
}

type StateProps = {
  overKey: string;
}

type DispatchProps = {
  +overItem: (key: string) => void;
  +leaveItem: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

function ResultCard(props: Props) {
  const {
    hidden, detectedObjects, openConfig,
    overKey,
    overItem, leaveItem,
  } = props;

  const cardDepth = hidden ? 1 : 0;
  const oneKeyIsOver = !!overKey;

  return (
    <Card depth={cardDepth}>
      <CardTitle>{messages.DETECTION_RESULTS}</CardTitle>

      <span className={style.listTitle}>{messages.DETECTED_ITEMS}</span>
      <ul className={style.list}>
        {detectedObjects.map((object) => {
          const onEnter = () => overItem(object);
          const itemIsHidden = oneKeyIsOver && overKey !== object;
          const itemClass = classnames(style.item, {
            [style.item_hidden]: itemIsHidden,
          });
          return (
            <li
              key={object}
              onMouseEnter={onEnter}
              onFocus={onEnter}
              onMouseLeave={leaveItem}
              onBlur={leaveItem}
              className={itemClass}
            >
              <span>-</span>{object}
            </li>
          );
        })}
      </ul>

      <CardButtons>
        <Button onClick={openConfig} isPrimary>
          {messages.CHANGE_CONFIGURATION}
        </Button>
      </CardButtons>
    </Card>
  );
}

function mapStateToProps(state: State): StateProps {
  return {
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
