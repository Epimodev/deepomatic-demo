// @flow
import * as React from 'react';
import type { DetectedBox } from 'src/services/deepomatic/types';
import style from './style.scss';

type Props = {
  onClick: (id: string) => void;
  box: DetectedBox;
  delay: number;
}

function AreaPoint(props: Props) {
  const { onClick, box, delay } = props;
  const xCenter = (box.xmin + box.xmax) / 2;
  const yCenter = (box.ymin + box.ymax) / 2;
  const xCenterPct = Math.round(xCenter * 100);
  const yCenterPct = Math.round(yCenter * 100);

  const containerCss = {
    top: `${yCenterPct}%`,
    left: `${xCenterPct}%`,
    transitionDelay: `${delay}ms`,
  };

  const onPointClick = () => onClick(box.id);

  return (
    <div className={style.pointContainer} style={containerCss}>
      <button className={style.pointButton} onClick={onPointClick} />
    </div>
  );
}

export default AreaPoint;
