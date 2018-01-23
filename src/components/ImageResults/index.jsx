// @flow
import * as React from 'react';
import * as PIXI from 'pixi.js';
import style from './style.scss';

type Props = {}

type State = {}

class ImageResults extends React.PureComponent<Props, State> {
  container: HTMLDivElement | null
  pixiApp: any
  resizeCanvasBind: () => void
  setContainerBind: (reference: HTMLDivElement | null) => void

  constructor(props: Props) {
    super(props);

    this.resizeCanvasBind = this.resizeCanvas.bind(this);
    this.setContainerBind = this.setContainer.bind(this);
  }

  componentDidMount() {
    if (this.container) {
      this.pixiApp = new PIXI.Application();
      this.pixiApp.renderer.autoResize = true;
      this.container.appendChild(this.pixiApp.view);

      window.addEventListener('resize', this.resizeCanvasBind);
      this.resizeCanvas();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCanvasBind);
  }

  resizeCanvas() {
    setTimeout(() => {
      if (this.container) {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        this.pixiApp.renderer.resize(width, height);
      }
    }, 50);
  }

  setContainer(reference: HTMLDivElement | null) {
    this.container = reference;
  }

  render() {
    return (
      <div ref={this.setContainerBind} className={style.container} />
    );
  }
}

export default ImageResults;
