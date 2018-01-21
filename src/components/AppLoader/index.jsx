// @flow
import * as React from 'react';
import Transition from 'src/components/no-design/Transition';
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

function AppLoader(props: Props) {
  const { show, message } = props;

  return (
    <Transition
      in={show}
      classNames={TRANSITION_CLASSNAMES}
      timeout={300}
    >
      <div className={style.container}>
        {message}
        <div className={style.dots}>
          <div className={style.dot_1} />
          <div className={style.dot_2} />
          <div className={style.dot_3} />
        </div>
      </div>
    </Transition>
  );
}

export default AppLoader;
