// @flow
import * as React from 'react';
import style from './style.scss';

type Props = {
  children: string;
}

function CardTitle(props: Props) {
  const { children } = props;

  return (
    <h3 className={style.title}>
      {children}
    </h3>
  );
}

export default CardTitle;
