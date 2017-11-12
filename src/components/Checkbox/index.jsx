// @flow
import * as React from 'react';
import classnames from 'classnames';
import Icon from 'src/components/Icon';
import checkmarkIcon from 'src/icons/checkmark.svg';
import style from './style.scss';

type Props = {
  name: string;
  checked: boolean;
  color: 'pink' | 'orange' | 'gray';
  children: string;
  onChange: (name: string, value: boolean) => void;
}

function Checkbox(props: Props) {
  const {
    name, checked, color, children, onChange,
  } = props;

  const containerClass = classnames(style.container, style[color], {
    [style.container_checked]: checked,
  });
  const onClick = () => onChange(name, !checked);

  return (
    <button className={containerClass} onClick={onClick}>
      <Icon href={checkmarkIcon} className={style.checkmark} />
      <span className={style.label}>{children}</span>
    </button>
  );
}

Checkbox.defaultProps = {
  color: 'gray',
};

export default Checkbox;
