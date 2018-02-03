// @flow
import * as React from 'react';
import type { DetectedBox } from 'src/services/deepomatic/types';
import Icon from 'src/components/Icon';
import closeIcon from 'src/icons/close.svg';
import style from './style.scss';

const MIN_PADDING = 10;
const LABEL_HEIGHT = 30;
const MIN_TOP_SPACE = LABEL_HEIGHT + (MIN_PADDING * 2);
const LABEL_TOP_OFFET = LABEL_HEIGHT + MIN_PADDING;

type ImageSize = {
  width: number;
  height: number;
}

type Props = {
  size: ImageSize;
  box: DetectedBox;
  onClose: () => void;
}

type State = {
  top: number;
  left: number;
}

class AreaLabel extends React.PureComponent<Props, State> {
  container: HTMLDivElement | null
  setContainerBind: (reference: HTMLDivElement | null) => void

  state = {
    top: 0,
    left: 0,
  }

  constructor(props: Props) {
    super(props);

    this.setContainerBind = this.setContainer.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  computeTopPosition(size: ImageSize, box: DetectedBox): number {
    const boxTopPosition = box.ymin * size.height;
    const labelIsAtTop = boxTopPosition >= MIN_TOP_SPACE;
    const topPosition = labelIsAtTop
      ? boxTopPosition - LABEL_TOP_OFFET
      : (box.ymax * size.height) + MIN_PADDING;

    return topPosition;
  }

  computeLeftPosition(size: ImageSize, box: DetectedBox): number {
    const labelWidth = this.container ? this.container.offsetWidth : 0;
    const boxWidth = (box.xmax - box.xmin) * size.width;
    const boxLeft = box.xmin * size.width;
    const leftLabelBox = (labelWidth - boxWidth) / 2;
    const leftPosition = boxLeft - leftLabelBox;

    if (leftPosition < MIN_PADDING) {
      return MIN_PADDING;
    }
    const maxLeft = size.width - labelWidth - MIN_PADDING;
    if (leftPosition > maxLeft) {
      return maxLeft;
    }

    return leftPosition;
  }

  componentDidMount() {
    const { size, box } = this.props;
    const top = this.computeTopPosition(size, box);
    const left = this.computeLeftPosition(size, box);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ top, left });
  }

  componentWillReceiveProps(nextProps: Props) {
    const { size, box } = nextProps;
    const top = this.computeTopPosition(size, box);
    const left = this.computeLeftPosition(size, box);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ top, left });
  }

  setContainer(reference: HTMLDivElement | null) {
    this.container = reference;
  }

  render() {
    const { box, onClose } = this.props;
    const { top, left } = this.state;
    const css = {
      top: `${top}px`,
      left: `${left}px`,
    };

    return (
      <div className={style.container} style={css} ref={this.setContainerBind}>
        <span className={style.label}>{box.label}</span>
        <button className={style.button} onClick={onClose}>
          <Icon href={closeIcon} className={style.buttonIcon} />
        </button>
      </div>
    );
  }
}

export default AreaLabel;
