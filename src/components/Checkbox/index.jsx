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

  const containerClass = classnames(style.container, style[color]);
  const checkboxClass = classnames(style.checkbox, {
    [style.checkbox_active]: checked,
  });
  const onClick = () => onChange(name, !checked);

  return (
    <button className={containerClass} onClick={onClick}>
      <div className={checkboxClass}>
        <Icon href={checkmarkIcon} className={style.checkmark} />
      </div>
      <div className={style.label}>{children}</div>
    </button>
  );
}

Checkbox.defaultProps = {
  color: 'gray',
};

export default Checkbox;
