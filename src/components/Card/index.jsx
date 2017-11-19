// @flow
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { computeStyles } from './utils';
import style from './style.scss';
import CardTitle from './CardTitle';
import CardText from './CardText';
import CardButtons from './CardButtons';
import CardLoader from './CardLoader';

type Props = {
  depth: number;
  show: boolean;
  children: React.Element<any> | React.ChildrenArray<React.Element<any>>;
  loading: boolean;
  loadingMessage: string;
}

const TRANSITION_CLASSNAMES = {
  enter: style.containerEnter,
  enterActive: style.containerEnterActive,
  exit: style.containerExit,
  exitActive: style.containerExitActive,
};

function Card(props: Props) {
  const {
    depth, show, children, loading, loadingMessage,
  } = props;

  const { cardStyle, contentStyle } = computeStyles(depth);
  const contentClass = classnames(style.content, {
    [style.content_blurred]: depth > 0 || loading,
  });

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
          <div style={contentStyle} className={contentClass}>
            {children}
          </div>
          <CardLoader show={loading} message={loadingMessage} />
        </div>
      </div>
    </CSSTransition>
  );
}

Card.defaultProps = {
  depth: 0,
  show: true,
  loading: false,
  loadingMessage: '',
};

export default Card;
export { CardTitle, CardText, CardButtons, CardLoader };
