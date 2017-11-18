// @flow
import * as React from 'react';
import classnames from 'classnames';
import style from './style.scss';

type Props = {
  children: string;
  onClick: null | () => void;
  isPrimary: boolean;
}

function Button(props: Props) {
  const { children, isPrimary, onClick } = props;

  const containerClass = classnames(style.container, {
    [style.container_disabled]: !onClick,
  });
  const buttonClass = classnames(style.button, {
    [style.button_primary]: isPrimary,
  });

  return (
    <div className={containerClass}>
      <button type="button" onClick={onClick} className={buttonClass}>
        {children}
      </button>
    </div>
  );
}

Button.defaultProps = {
  isPrimary: false,
};

export default Button;
