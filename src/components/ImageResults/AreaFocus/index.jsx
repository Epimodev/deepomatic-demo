// @flow
import * as React from 'react';
import style from './style.scss';

type Props = {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  box: {
    xmin: number;
    xmax: number;
    ymin: number;
    ymax: number;
  }
}

function AreaFocus(props: Props) {
  const { imageUrl, imageWidth, imageHeight, box } = props;
  const widthPercent = box.xmax - box.xmin;
  const heightPercent = box.ymax - box.ymin;
  const top = Math.floor(imageHeight * box.ymin);
  const left = Math.floor(imageWidth * box.xmin);
  const width = Math.floor(imageWidth * widthPercent);
  const height = Math.floor(imageWidth * heightPercent);

  const containerCss = {
    top: `${top - 1}px`,
    left: `${left - 1}px`,
    width: `${width}px`,
    height: `${height}px`,
  };
  const imageCss = {
    top: `${-top}px`,
    left: `${-left}px`,
    width: `${imageWidth}px`,
    height: `${imageHeight}px`,
  };

  return (
    <div className={style.container} style={containerCss}>
      <img alt="box preview" src={imageUrl} className={style.container} style={imageCss} />
    </div>
  );
}

AreaFocus.defaultProps = {};

export default AreaFocus;
