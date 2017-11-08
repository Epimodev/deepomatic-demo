// @flow
import * as React from 'react';
import style from './style.scss';

type Props = {
  children: React.Element<any>;
}

function Card(props: Props) {
  const { children } = props;

  return (
    <div className={style.container}>
      <div className={style.card}>
        {children}
      </div>
    </div>
  );
}

Card.defaultProps = {};

export default Card;
