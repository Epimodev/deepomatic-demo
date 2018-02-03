// @flow
import * as React from 'react';

type Props = {
  // active is only used by Card component
  active: boolean; // eslint-disable-line react/no-unused-prop-types
  children: React.Node;
}

function CardOverlay(props: Props) {
  return props.children;
}

CardOverlay.defaultProps = {};

export default CardOverlay;
