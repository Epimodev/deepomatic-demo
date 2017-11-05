// @flow
import React from 'react';

type Props = {
  href: string,
  className?: string,
}

const Icon = (props: Props) => {
  const { href, className } = props;
  return (
    <svg className={className}>
      <use xlinkHref={href} />
    </svg>
  );
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
