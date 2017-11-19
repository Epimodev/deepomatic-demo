// @flow
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import style from './style.scss';

type Props = {
  +show: boolean;
  +message: string;
}

const TRANSITION_CLASSNAMES = {
  enter: style.containerEnter,
  enterActive: style.containerEnterActive,
  exit: style.containerExit,
  exitActive: style.containerExitActive,
};

function CardLoader(props: Props) {
  const { show, message } = props;

  return (
    <CSSTransition
      in={show}
      classNames={TRANSITION_CLASSNAMES}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      <div className={style.container}>
        {message}
        <div className={style.dots}>
          <div className={style.dot_1} />
          <div className={style.dot_2} />
          <div className={style.dot_3} />
        </div>
      </div>
    </CSSTransition>
  );
}

export default CardLoader;
