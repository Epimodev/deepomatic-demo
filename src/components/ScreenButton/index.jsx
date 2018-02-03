// @flow
import * as React from 'react';
import classnames from 'classnames';
import arrowIcon from 'src/icons/arrow.svg';
import Icon from '../Icon';
import style from './style.scss';

type Props = {
  direction: 'up' | 'down';
  onClick: () => void;
}

function ScreenButton(props: Props) {
  const { direction, onClick } = props;
  const isUp = direction === 'up';

  const buttonClass = classnames(style.button, {
    [style.button_up]: isUp,
  });
  const iconClass = classnames(style.icon, {
    [style.icon_up]: isUp,
  });

  return (
    <button className={buttonClass} onClick={onClick}>
      <Icon href={arrowIcon} className={iconClass} />
    </button>
  );
}

export default ScreenButton;
