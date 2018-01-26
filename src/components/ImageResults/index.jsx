// @flow
import * as React from 'react';
import classnames from 'classnames';
import Transition from '../no-design/Transition';
import AreaFocus from './AreaFocus';
import style from './style.scss';

const ANIMATION_CLASSNAMES = {
  enter: style.areaEnter,
  enterActive: style.areaEnterActive,
  exit: style.areaExit,
  exitActive: style.areaExitActive,
};

const testBox = {
  xmin: 0.5,
  xmax: 0.7,
  ymin: 0.5,
  ymax: 0.6,
};

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
    const { url, width, height } = this.props;
    const { areaSelected } = this.state;
    const blurredClass = classnames(style.blurredImage, {
      [style.blurredImage_hide]: !areaSelected,
    });

    return (
      <div className={style.container} onClick={this.onSelectAreaBind}>
        <img src={url} alt="preview" className={style.image} />
        <img src={url} alt="preview" className={blurredClass} />
        <Transition in={areaSelected} classNames={ANIMATION_CLASSNAMES} timeout={500}>
          <AreaFocus imageUrl={url} imageWidth={width} imageHeight={height} box={testBox} />
        </Transition>
      </div>
    );
  }
}

export default ImageResults;
