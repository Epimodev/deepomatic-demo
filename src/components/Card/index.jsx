// @flow
import * as React from 'react';
import Transition from 'src/components/no-design/Transition';
import classnames from 'classnames';
import { childIsComponent } from 'src/utils/reactUtils';
import { computeStyles, nextChildIsOverlay } from './utils';
import style from './style.scss';
import CardContent from './CardContent';
import CardOverlay from './CardOverlay';
import CardTitle from './CardTitle';
import CardText from './CardText';
import CardButtons from './CardButtons';
// import AppLoader from '../AppLoader';

type ChildTypes = typeof CardContent | typeof CardOverlay;
type ComponentChildren = React.Element<ChildTypes>;

type Props = {
  depth: number;
  show: boolean;
  children: ComponentChildren | React.ChildrenArray<ComponentChildren>;
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
    depth, show, children, className,
  } = props;

  const containerClass = classnames(style.container, className);
  const { cardStyle, contentStyle } = computeStyles(depth);

  return (
    <Transition
      in={show}
      classNames={TRANSITION_CLASSNAMES}
      timeout={500}
    >
      <div className={containerClass}>
        <div style={cardStyle} className={style.card}>
          {React.Children.map(children, (child: ComponentChildren, index) => {
            if (childIsComponent(child, CardContent)) {
              const isOverlayed = depth > 0 || nextChildIsOverlay(children, index);
              return React.cloneElement(child, { css: contentStyle, isOverlayed });
            }
            if (childIsComponent(child, CardOverlay)) {
              return child;
            }
            return null;
          })}
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
export { CardContent, CardOverlay, CardTitle, CardText, CardButtons };
