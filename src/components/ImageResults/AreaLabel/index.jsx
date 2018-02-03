// @flow
import * as React from 'react';
import type { DetectedBox } from 'src/services/deepomatic/types';
import Icon from 'src/components/Icon';
import closeIcon from 'src/icons/close.svg';
import style from './style.scss';

type Props = {
  box: DetectedBox;
  onClose: () => void;
}

function AreaLabel(props: Props) {
  const { box, onClose } = props;

  return (
    <div className={style.container}>
      <span className={style.label}>{box.label}</span>
      <button className={style.button} onClick={onClose}>
        <Icon href={closeIcon} className={style.buttonIcon} />
      </button>
    </div>
  );
}

AreaLabel.defaultProps = {};

export default AreaLabel;
