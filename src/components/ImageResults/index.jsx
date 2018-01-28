// @flow
import * as React from 'react';
import classnames from 'classnames';
import type { DetectedBox } from 'src/services/deepomatic/types';
import { TransitionGroup } from 'react-transition-group';
import Transition from '../no-design/Transition';
import AreaPoint from './AreaPoint';
import AreaFocus from './AreaFocus';
import style from './style.scss';

const ANIMATION_CLASSNAMES = {
  enter: style.areaEnter,
  enterActive: style.areaEnterActive,
  exit: style.areaExit,
  exitActive: style.areaExitActive,
};
const POINT_ANIMATION_CLASSNAMES = {
  enter: style.pointEnter,
  enterActive: style.pointEnterActive,
  exit: style.pointExit,
  exitActive: style.pointExitActive,
};
const POINT_DURATION = 300;
const POINT_DELAY = 50;

type Props = {
  url: string;
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

  selectArea(boxId: string) {
    this.setState(() => ({ areaSelected: boxId }));
  }

  unselectArea() {
    this.setState(() => ({ areaSelected: '' }));
  }

  render() {
    const { url, boxes } = this.props;
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
            <Transition key={box.id} classNames={ANIMATION_CLASSNAMES} timeout={300}>
              <AreaFocus imageUrl={url} box={box} />
            </Transition>
          ))}
        </TransitionGroup>
        {boxes.map((box, index) => {
          const timeout = {
            enter: POINT_DURATION + (POINT_DELAY * (boxes.length - 1)),
            exit: POINT_DURATION,
          };
          const delay = !areaSelected ? index * POINT_DELAY : 0;

          return (
            <Transition
              key={box.id}
              in={!areaSelected}
              classNames={POINT_ANIMATION_CLASSNAMES}
              timeout={timeout}
            >
              <AreaPoint onClick={this.selectAreaBind} box={box} delay={delay} />
            </Transition>
          );
        })}
      </div>
    );
  }
}

export default ImageResults;
