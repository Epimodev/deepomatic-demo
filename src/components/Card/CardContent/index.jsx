// @flow
import * as React from 'react';
import classnames from 'classnames';
import style from './style.scss';

type ComponentProps = {
  +children: React.Node;
}

type ClonedProps = {
  +isOverlayed: boolean;
  +css: { [string]: any } | null;
}

type Props = ComponentProps & ClonedProps

function CardContent(props: Props) {
  const { children, css, isOverlayed } = props;
  const contentClass = classnames(style.content, {
    [style.content_blurred]: isOverlayed,
  });

  return (
    <div style={css} className={contentClass}>
      {children}
    </div>
  );
}

CardContent.defaultProps = {
  isOverlayed: false,
  css: null,
};

export default CardContent;
