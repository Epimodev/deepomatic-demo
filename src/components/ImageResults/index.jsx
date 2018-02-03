// @flow
import * as React from 'react';
import classnames from 'classnames';
import type { DetectedBox } from 'src/services/deepomatic/types';
import { TransitionGroup } from 'react-transition-group';
import Transition from '../no-design/Transition';
import AreaPoint from './AreaPoint';
import AreaFocus from './AreaFocus';
import AreaLabel from './AreaLabel';
import style from './style.scss';

const AREA_ANIMATION_CLASSNAMES = {
  enter: style.areaEnter,
  enterActive: style.areaEnterActive,
  exit: style.areaExit,
  exitActive: style.areaExitActive,
};
const LABEL_ANIMATION_CLASSNAMES = {
  enter: style.labelEnter,
  enterActive: style.labelEnterActive,
  exit: style.labelExit,
  exitActive: style.labelExitActive,
};
const POINT_ANIMATION_CLASSNAMES = {
  enter: style.pointEnter,
  enterActive: style.pointEnterActive,
  exit: style.pointExit,
  exitActive: style.pointExitActive,
};

type Props = {
  size: {
    width: number;
    height: number;
  };
  url: string;
  overedLabel: string;
  boxes: DetectedBox[];
}

type State = {
  areaSelected: string;
}

class ImageResults extends React.Component<Props, State> {
  selectAreaBind: (id: string) => void
  unselectAreaBind: () => void
  state = {
    areaSelected: '',
  }

  constructor(props: Props) {
    super(props);

    this.selectAreaBind = this.selectArea.bind(this);
    this.unselectAreaBind = this.unselectArea.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.url !== nextProps.url) {
      this.setState(() => ({ areaSelected: '' }));
    }
  }

  selectArea(boxId: string) {
    this.setState(() => ({ areaSelected: boxId }));
  }

  unselectArea() {
    this.setState(() => ({ areaSelected: '' }));
  }

  render() {
    const { size, url, boxes, overedLabel } = this.props;
    const { areaSelected } = this.state;
    const blurredClass = classnames(style.blurredImage, {
      [style.blurredImage_hide]: !areaSelected,
    });

    const focusedBox = boxes.find(box => box.id === areaSelected);
    const transitionBoxes = focusedBox ? [focusedBox] : [];

    return (
      <div className={style.container}>
        <img src={url} alt="preview" className={style.image} />
        <img src={url} alt="preview" className={blurredClass} onClick={this.unselectAreaBind} />
        <TransitionGroup>
          {transitionBoxes.map(box => (
            <Transition key={box.id} classNames={AREA_ANIMATION_CLASSNAMES} timeout={400}>
              <AreaFocus imageUrl={url} box={box} />
            </Transition>
          ))}
          {transitionBoxes.map(box => (
            <Transition key={box.id} classNames={LABEL_ANIMATION_CLASSNAMES} timeout={500}>
              <AreaLabel size={size} box={box} onClose={this.unselectAreaBind} />
            </Transition>
          ))}
        </TransitionGroup>
        {boxes.map(box => (
          <Transition
            key={box.id}
            in={!areaSelected}
            classNames={POINT_ANIMATION_CLASSNAMES}
            timeout={400}
          >
            <AreaPoint onClick={this.selectAreaBind} box={box} overedLabel={overedLabel} />
          </Transition>
        ))}
      </div>
    );
  }
}

export default ImageResults;
