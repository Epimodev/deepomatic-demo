// @flow
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

type Props = {
  in: boolean;
  classNames: {
    enter: string;
    enterActive: string;
    exit: string;
    exitActive: string;
  };
  timeout: number | { enter: number; exit: number };
  children: React.Element<*>;
}

function Transition(props: Props) {
  const { classNames, timeout, children } = props;

  return (
    <CSSTransition
      in={props.in}
      classNames={classNames}
      timeout={timeout}
      mountOnEnter
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
}

Transition.defaultProps = {
  in: false,
};

export default Transition;
