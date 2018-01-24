// @flow
import * as React from 'react';
import * as PIXI from 'pixi.js';

type Props = {
  url: string;
  width: number;
  height: number;
}

type State = {}

class ImageResults extends React.Component<Props, State> {
  canvas: HTMLCanvasElement | null
  setCanvasBind: (reference: HTMLCanvasElement | null) => void
  pixiApp: any
  background: any
  blurFilter: any
  blurMask: any

  constructor(props: Props) {
    super(props);

    this.setCanvasBind = this.setCanvas.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    if (this.canvas) {
      this.pixiApp = new PIXI.Application({ view: this.canvas });
      this.pixiApp.renderer.autoResize = true;
      this.background = PIXI.Sprite.fromImage(this.props.url);
      this.blurFilter = new PIXI.filters.BlurFilter();
      this.blurMask = new PIXI.Graphics();
      this.pixiApp.stage.addChild(this.background);

      this.background.filters = [this.blurFilter];
      this.blurFilter.blur = 2;
      this.blurFilter.quality = 3;

      this.blurMask.isMask = true;
      this.background.mask = this.blurMask;

      this.resizeCanvas(this.props);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { width, height, url } = this.props;
    const { width: nextWidth, height: nextHeight, url: nextUrl } = nextProps;

    if (width !== nextWidth || height !== nextHeight) {
      this.resizeCanvas(nextProps);
      this.updateMask(nextProps);
    }
    if (url !== nextUrl) {
      this.updateImage(nextProps);
    }
  }

  resizeCanvas(props: Props) {
    const { width, height } = props;
    this.pixiApp.renderer.resize(width, height);
    this.background.width = width;
    this.background.height = height;
  }

  updateImage(props: Props) {
    const texture = PIXI.Texture.fromImage(props.url);
    this.background.texture = texture;
  }

  updateMask(props: Props) {
    const { width, height } = props;
    this.blurMask.clear();
    this.blurMask.beginFill(1, 0.5);
    this.blurMask.drawRoundedRect(width / 4, height / 4, width / 2, height / 2, 5);
  }

  setCanvas(reference: HTMLCanvasElement | null) {
    this.canvas = reference;
  }

  render() {
    return (
      <canvas ref={this.setCanvasBind} />
    );
  }
}

export default ImageResults;
