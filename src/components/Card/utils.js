// @flow
import * as React from 'react';
import memoize from 'fast-memoize';
import { childIsComponent } from 'src/utils/reactUtils';
import CardOverlay from './CardOverlay';

type CardStyles = {
  cardStyle: {
    transform: string;
  } | null;
  contentStyle: {
    opacity: number;
  } | null;
}

function computeStyles0(depth: number): CardStyles {
  const isStack = depth > 0;

  if (isStack) {
    const transformX = 20 * Math.sqrt(depth + -0.45);
    const scale = 1 - (0.05 * depth);
    const opacity = 1 / (1.75 * depth);
    return {
      cardStyle: { transform: `translateX(-${transformX}px) scale(${scale})` },
      contentStyle: { opacity },
    };
  }

  return {
    cardStyle: null,
    contentStyle: null,
  };
}

export const computeStyles = memoize(computeStyles0);

export function nextChildIsOverlay(children: any, index: number) {
  const nextChild: React.Element<*> = children[index + 1];
  if (nextChild && childIsComponent(nextChild, CardOverlay)) {
    return nextChild.props.active;
  }
  return false;
}
