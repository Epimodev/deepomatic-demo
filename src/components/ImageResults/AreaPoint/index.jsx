// @flow
import * as React from 'react';
import style from './style.scss';

type Props = {
  onClick: () => void;
  box: {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
  }
}

function AreaPoint(props: Props) {
  const { onClick, box } = props;
  const xCenter = (box.xmin + box.xmax) / 2;
  const yCenter = (box.ymin + box.ymax) / 2;
  const xCenterPct = Math.round(xCenter * 100);
  const yCenterPct = Math.round(yCenter * 100);

  const containerCss = {
    top: `${yCenterPct}%`,
    left: `${xCenterPct}%`,
  };

  return (
    <div className={style.pointContainer} style={containerCss}>
      <button className={style.pointButton} onClick={onClick} />
    </div>
  );
}

export default AreaPoint;
