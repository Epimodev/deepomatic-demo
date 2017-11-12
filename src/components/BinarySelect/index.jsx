// @flow
import * as React from 'react';
import classnames from 'classnames';
import style from './style.scss';

type Props = {
  value: 'left' | 'right' | '';
  leftLabel: string;
  rightLabel: string;
  onChange: (value: 'left' | 'right') => void;
}

function BinarySelect(props: Props) {
  const {
    value, leftLabel, rightLabel, onChange,
  } = props;

  const leftButtonClass = classnames(style.button, {
    [style.button_selected]: value === 'left',
  });
  const rightButtonClass = classnames(style.button, {
    [style.button_selected]: value === 'right',
  });

  const onSelectLeft = () => onChange('left');
  const onSelectRight = () => onChange('right');

  return (
    <div className={style.container}>
      <button aria-label={leftLabel} onClick={onSelectLeft} className={leftButtonClass} />
      <button aria-label={rightLabel} onClick={onSelectRight} className={rightButtonClass} />
    </div>
  );
}

export default BinarySelect;
