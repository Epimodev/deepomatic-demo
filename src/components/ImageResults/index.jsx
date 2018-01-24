// @flow
import * as React from 'react';
import * as PIXI from 'pixi.js';

type Props = {
  width: number;
  height: number;
}

type State = {}

class ImageResults extends React.Component<Props, State> {
  canvas: HTMLCanvasElement | null
  pixiApp: any
  setCanvasBind: (reference: HTMLCanvasElement | null) => void

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

      this.resizeCanvas(this.props);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.resizeCanvas(nextProps);
  }

  resizeCanvas(props: Props) {
    const { width, height } = props;
    this.pixiApp.renderer.resize(width, height);
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
