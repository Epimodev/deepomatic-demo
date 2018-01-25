// @flow
import * as React from 'react';
import style from './style.scss';

type Props = {
  url: string;
  width: number;
  height: number;
}

type State = {}

class ImageResults extends React.Component<Props, State> {
  render() {
    const { url } = this.props;

    return (
      <div>
        <img src={url} alt="preview" className={style.image} />
      </div>
    );
  }
}

export default ImageResults;
