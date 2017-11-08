// @flow
import * as React from 'react';
import style from './style.scss';

type Props = {
  children: string;
}

function CardText(props: Props) {
  const { children } = props;

  return (
    <p className={style.paragraph}>
      {children}
    </p>
  );
}

export default CardText;
