// @flow
import * as React from 'react';
import classnames from 'classnames';
import style from './style.scss';

type Props = {
  url: string;
  width: number;
  height: number;
}

type State = {
  areaSelected: boolean;
}

class ImageResults extends React.Component<Props, State> {
  onSelectAreaBind: () => void
  state = {
    areaSelected: false,
  }

  constructor(props: Props) {
    super(props);

    this.onSelectAreaBind = this.selectArea.bind(this);
  }

  selectArea() {
    this.setState(state => ({ areaSelected: !state.areaSelected }));
  }

  render() {
    const { url } = this.props;
    const { areaSelected } = this.state;
    const blurredClass = classnames(style.blurredImage, {
      [style.blurredImage_hide]: !areaSelected,
    });

    return (
      <div className={style.container} onClick={this.onSelectAreaBind}>
        <img src={url} alt="preview" className={style.image} />
        <img src={url} alt="preview" className={blurredClass} />
      </div>
    );
  }
}

export default ImageResults;
