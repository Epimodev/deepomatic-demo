// @flow
import * as React from 'react';
import classnames from 'classnames';
import style from './style.scss';

type Props = {
  children: string;
  onClick: null | () => void;
  isPrimary: boolean;
  className: string;
}

function Button(props: Props) {
  const {
    children, isPrimary, onClick, className,
  } = props;

  const containerClass = classnames(style.container, className, {
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
  className: '',
};

export default Button;
