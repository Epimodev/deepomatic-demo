// @flow
import * as React from 'react';
import type { DetectedBox } from 'src/services/deepomatic/types';
import style from './style.scss';

type Props = {
  imageUrl: string;
  box: DetectedBox;
}

function AreaFocus(props: Props) {
  const { imageUrl, box } = props;
  const width = box.xmax - box.xmin;
  const height = box.ymax - box.ymin;
  const topPct = Math.round(box.ymin * 100);
  const leftPct = Math.round(box.xmin * 100);
  const widthPct = Math.round(width * 100);
  const heightPct = Math.round(height * 100);

  const imgTop = -box.ymin / height;
  const imgLeft = -box.xmin / width;
  const imgTopPct = Math.round(imgTop * 100);
  const imgLeftPct = Math.round(imgLeft * 100);
  const imgWidthPct = Math.round((1 / width) * 100);
  const imgHeightPct = Math.round((1 / height) * 100);

  const containerCss = {
    top: `${topPct}%`,
    left: `${leftPct}%`,
    width: `${widthPct}%`,
    height: `${heightPct}%`,
  };

  const imageCss = {
    top: `${imgTopPct}%`,
    left: `${imgLeftPct}%`,
    width: `${imgWidthPct}%`,
    height: `${imgHeightPct}%`,
  };

  return (
    <div className={style.container} style={containerCss}>
      <img alt="box preview" src={imageUrl} className={style.imageBox} style={imageCss} />
    </div>
  );
}

AreaFocus.defaultProps = {};

export default AreaFocus;
