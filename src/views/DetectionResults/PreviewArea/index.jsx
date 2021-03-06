// @flow
import * as React from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State } from 'src/store';
import type { DetectedBox } from 'src/services/deepomatic/types';
import ImageResults from 'src/components/ImageResults';
import style from './style.scss';

type ComponentProps = {}

type StateProps = {
  +imageUrl: string;
  +boxes: DetectedBox[];
  +overedLabel: string;
}

type Props = ComponentProps & StateProps

type ComponentState = {
  imageLoaded: boolean;
  imageWidth: number;
  imageHeight: number;
  containerHeight: number;
  containerWidth: number;
}

class PreviewArea extends React.PureComponent<Props, ComponentState> {
  static defaultProps = {}
  updateContainerSizeBind: () => void
  onImageLoadBind: () => void
  setContainerNodeBind: (reference: HTMLDivElement | null) => void
  setImageNodeBind: (reference: HTMLImageElement | null) => void
  containerNode: HTMLDivElement | null = null;
  imageNode: HTMLImageElement | null = null;
  state = {
    imageLoaded: false,
    containerWidth: 0,
    containerHeight: 0,
    imageWidth: 0,
    imageHeight: 0,
  }

  constructor(props: Props) {
    super(props);
    this.updateContainerSizeBind = this.updateContainerSize.bind(this);
    this.onImageLoadBind = this.onImageLoad.bind(this);
    this.setContainerNodeBind = this.setContainerNode.bind(this);
    this.setImageNodeBind = this.setImageNode.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateContainerSizeBind);
    setTimeout(() => this.updateContainerSize(), 20);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateContainerSizeBind);
  }

  computeImageSize() {
    if (this.state.imageLoaded) {
      const {
        containerWidth, containerHeight, imageWidth, imageHeight,
      } = this.state;

      const containerRatio = containerWidth / containerHeight;
      const imageRatio = imageWidth / imageHeight;

      const imageIsFullWidth = imageRatio >= containerRatio;
      const { width, height } = imageIsFullWidth
        ? {
          width: containerWidth,
          height: Math.floor(containerWidth / imageRatio),
        }
        : {
          width: Math.floor(containerHeight * imageRatio),
          height: containerHeight,
        };

      return {
        width,
        height,
      };
    }

    return {
      width: 0,
      height: 0,
    };
  }

  onImageLoad() {
    if (this.imageNode) {
      const imageWidth = this.imageNode.naturalWidth;
      const imageHeight = this.imageNode.naturalHeight;
      this.setState(() => ({
        imageLoaded: true,
        imageWidth,
        imageHeight,
      }));
    }
  }

  updateContainerSize() {
    if (this.containerNode) {
      const containerWidth = this.containerNode.offsetWidth;
      const containerHeight = this.containerNode.offsetHeight;
      this.setState(() => ({
        containerWidth,
        containerHeight,
      }));
    }
  }

  setContainerNode(reference: HTMLDivElement | null) {
    this.containerNode = reference;
  }

  setImageNode(reference: HTMLImageElement | null) {
    this.imageNode = reference;
  }

  render() {
    const { imageUrl, boxes, overedLabel } = this.props;
    const imageSize = this.computeImageSize();
    const contentCss = {
      width: `${imageSize.width}px`,
      height: `${imageSize.height}px`,
    };


    return (
      <div className={style.container} ref={this.setContainerNodeBind}>
        <div className={style.content} style={contentCss}>
          <img
            src={imageUrl}
            alt="Detection Preview"
            onLoad={this.onImageLoadBind}
            ref={this.setImageNodeBind}
            className={style.image}
          />
          <ImageResults size={imageSize} url={imageUrl} boxes={boxes} overedLabel={overedLabel} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  const config = state.configuration.detectedConfig;
  const imageUrl = config.uploadType === 'url'
    ? config.imageUrl
    : config.fileValue;
  return {
    imageUrl,
    boxes: state.result.boxes,
    overedLabel: state.result.overKey,
  };
}

export default connect(mapStateToProps)(PreviewArea);
