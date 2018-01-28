// @flow
import * as React from 'react';
import classnames from 'classnames';
import type { DetectedBox } from 'src/services/deepomatic/types';
import style from './style.scss';

type Props = {
  onClick: (id: string) => void;
  box: DetectedBox;
  overedLabel: string;
}

function AreaPoint(props: Props) {
  const { onClick, box, overedLabel } = props;
  const xCenter = (box.xmin + box.xmax) / 2;
  const yCenter = (box.ymin + box.ymax) / 2;
  const xCenterPct = Math.round(xCenter * 100);
  const yCenterPct = Math.round(yCenter * 100);

  const oneLabelIsOvered = !!overedLabel;
  const isForward = oneLabelIsOvered && overedLabel === box.label;
  const isBackward = oneLabelIsOvered && !isForward;

  const buttonClass = classnames(style.pointButton, {
    [style.pointButton_forward]: isForward,
    [style.pointButton_backward]: isBackward,
  });

  const containerCss = {
    top: `${yCenterPct}%`,
    left: `${xCenterPct}%`,
  };

  const onPointClick = () => onClick(box.id);

  return (
    <div className={style.pointContainer} style={containerCss}>
      <button className={buttonClass} onClick={onPointClick} />
    </div>
  );
}

export default AreaPoint;
