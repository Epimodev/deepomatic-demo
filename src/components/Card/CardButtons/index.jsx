// @flow
import * as React from 'react';
import classnames from 'classnames';
import Button from 'src/components/Button';
import style from './style.scss';

type Props = {
  children: React.Element<typeof Button> | React.ChildrenArray<React.Element<typeof Button>>
}

function CardButtons(props: Props) {
  const { children } = props;
  const containerClass = classnames(style.buttonList, {
    [style.buttonList_single]: children.constructor !== Array,
  });

  return (
    <div className={containerClass}>
      {children}
    </div>
  );
}

export default CardButtons;
