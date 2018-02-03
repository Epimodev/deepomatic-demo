// @flow
import * as React from 'react';
import Transition from 'src/components/no-design/Transition';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import monumentsIcon from 'src/icons/monuments-night.svg';
import messages from 'src/messages';
import style from './style.scss';

type Props = {
  +show: boolean;
  +onCancel: () => void;
  +onRetry: () => void;
}

const TRANSITION_CLASSNAMES = {
  enter: style.containerEnter,
  enterActive: style.containerEnterActive,
  exit: style.containerExit,
  exitActive: style.containerExitActive,
};

function AppError(props: Props) {
  const { show, onCancel, onRetry } = props;

  return (
    <Transition
      in={show}
      classNames={TRANSITION_CLASSNAMES}
      timeout={300}
    >
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.title}>{messages.ERROR_TITLE}</div>
          <div className={style.sentence}>{messages.ERROR_SENTENCE}</div>
          <div className={style.buttons}>
            <Button onClick={onCancel}>{messages.CANCEL}</Button>
            <Button isPrimary onClick={onRetry}>{messages.RETRY}</Button>
          </div>
        </div>
        <div className={style.illustrationContainer}>
          <Icon href={monumentsIcon} className={style.illustration} />
        </div>
      </div>
    </Transition>
  );
}

AppError.defaultProps = {};

export default AppError;
