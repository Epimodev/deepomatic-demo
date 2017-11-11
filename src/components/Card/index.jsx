// @flow
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { computeStyles } from './utils';
import style from './style.scss';
import CardTitle from './CardTitle';
import CardText from './CardText';
import CardButtons from './CardButtons';

type Props = {
  depth: number;
  show: boolean;
  children: React.Element<any> | React.ChildrenArray<React.Element<any>>;
}

const TRANSITION_CLASSNAMES = {
  enter: style.containerEnter,
  enterActive: style.containerEnterActive,
  exit: style.containerExit,
  exitActive: style.containerExitActive,
};

function Card(props: Props) {
  const { depth, show, children } = props;

  const { cardStyle, contentStyle } = computeStyles(depth);

  return (
    <CSSTransition
      in={show}
      classNames={TRANSITION_CLASSNAMES}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <div className={style.container}>
        <div style={cardStyle} className={style.card}>
          <div style={contentStyle} className={style.content}>
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

Card.defaultProps = {
  depth: 0,
  show: true,
};

export default Card;
export { CardTitle, CardText, CardButtons };
