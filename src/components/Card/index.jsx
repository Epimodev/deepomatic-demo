// @flow
import * as React from 'react';
import Transition from 'src/components/no-design/Transition';
import classnames from 'classnames';
import { computeStyles } from './utils';
import style from './style.scss';
import CardTitle from './CardTitle';
import CardText from './CardText';
import CardButtons from './CardButtons';
import AppLoader from '../AppLoader';

type Props = {
  depth: number;
  show: boolean;
  children: React.Element<any> | React.ChildrenArray<React.Element<any>>;
  loading: boolean;
  loadingMessage: string;
  className: string;
}

const TRANSITION_CLASSNAMES = {
  enter: style.containerEnter,
  enterActive: style.containerEnterActive,
  exit: style.containerExit,
  exitActive: style.containerExitActive,
};

function Card(props: Props) {
  const {
    depth, show, children, loading, loadingMessage, className,
  } = props;

  const containerClass = classnames(style.container, className);
  const { cardStyle, contentStyle } = computeStyles(depth);
  const contentClass = classnames(style.content, {
    [style.content_blurred]: depth > 0 || loading,
  });

  return (
    <Transition
      in={show}
      classNames={TRANSITION_CLASSNAMES}
      timeout={500}
    >
      <div className={containerClass}>
        <div style={cardStyle} className={style.card}>
          <div style={contentStyle} className={contentClass}>
            {children}
          </div>
          <AppLoader show={loading} message={loadingMessage} />
        </div>
      </div>
    </Transition>
  );
}

Card.defaultProps = {
  depth: 0,
  show: true,
  loading: false,
  loadingMessage: '',
  className: '',
};

export default Card;
export { CardTitle, CardText, CardButtons };
