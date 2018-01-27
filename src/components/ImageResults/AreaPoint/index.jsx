// @flow
import * as React from 'react';
import style from './style.scss';

type Props = {
  onClick: () => void;
  imageWidth: number;
  imageHeight: number;
  box: {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
  }
}

function AreaPoint(props: Props) {
  const { onClick, imageWidth, imageHeight, box } = props;
  const xCenter = (box.xmin + box.xmax) / 2;
  const yCenter = (box.ymin + box.ymax) / 2;
  const xCenterPx = Math.floor(xCenter * imageWidth);
  const yCenterPx = Math.floor(yCenter * imageHeight);
  const top = yCenterPx - 10;
  const left = xCenterPx - 10;
  const buttonCss = {
    top: `${top}px`,
    left: `${left}px`,
  };

  return <button className={style.button} style={buttonCss} onClick={onClick} />;
}

export default AreaPoint;
