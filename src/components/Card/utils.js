// @flow
import memoize from 'fast-memoize';

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
    const opacity = 1 / (3 * depth);
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
