// @flow
import * as React from 'react';
import classnames from 'classnames';
import Transition from 'src/components/no-design/Transition';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import AppLoader from 'src/components/AppLoader';
import ScreenButton from 'src/components/ScreenButton';
import messages from 'src/messages';
import PreviewArea from './PreviewArea';
import ResultsCard from './ResultsCard';
import ConfigCard from './ConfigCard';
import * as actions from './actions';
import style from './style.scss';

type ComponentProps = {
  show: boolean;
}

type StateProps = {
  +configIsDisplayed: boolean;
  +isDetecting: boolean;
}

type DispatchProps = {
  +openConfig: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

type ComponentState = {
  isSmallScreen: boolean,
  showDetails: boolean;
}

const TRANSITION_CLASSNAMES = {
  enter: style.containerEnter,
  enterActive: style.containerEnterActive,
  exit: '',
  exitActive: '',
};

class DetectionResults extends React.PureComponent<Props, ComponentState> {
  checkScreenSizeBind: () => void
  showDetailsBind: () => void
  hideDetailsBind: () => void
  state = {
    isSmallScreen: false,
    showDetails: false,
  }

  constructor(props: Props) {
    super(props);

    this.checkScreenSizeBind = this.checkScreenSize.bind(this);
    this.showDetailsBind = this.showDetails.bind(this);
    this.hideDetailsBind = this.hideDetails.bind(this);
  }

  componentWillMount() {
    this.checkScreenSize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkScreenSizeBind);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreenSizeBind);
  }

  checkScreenSize() {
    const windowWidth = window.outerWidth;
    const isSmallScreen = windowWidth <= 768;
    this.setState({ isSmallScreen, showDetails: !isSmallScreen });
  }

  showDetails() {
    this.setState({ showDetails: true });
  }

  hideDetails() {
    this.setState({ showDetails: false });
  }

  render() {
    const {
      show, configIsDisplayed, isDetecting, openConfig,
    } = this.props;
    const { isSmallScreen, showDetails } = this.state;

    const partsClass = classnames(style.parts, {
      [style.parts_overlayed]: isDetecting,
    });
    const resultsPartClass = classnames(style.resultsPart, {
      [style.resultsPart_hidden]: isSmallScreen && !showDetails,
    });

    return (
      <Transition
        in={show}
        classNames={TRANSITION_CLASSNAMES}
        timeout={800}
      >
        <div className={style.container}>
          <div className={partsClass}>
            <div className={style.previewPart}>
              <PreviewArea />
            </div>
            <div className={resultsPartClass}>
              {isSmallScreen && (
                <React.Fragment>
                  <ScreenButton onClick={this.showDetailsBind} direction="up" />
                  <ScreenButton onClick={this.hideDetailsBind} direction="down" />
                </React.Fragment>
              )}
              <div className={style.resultCardsContainer}>
                <ResultsCard backward={configIsDisplayed} openConfig={openConfig} />
                <ConfigCard show={configIsDisplayed} />
              </div>
            </div>
          </div>
          <AppLoader show={isDetecting} message={messages.ANALYSING_IMAGE} />
        </div>
      </Transition>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  return {
    configIsDisplayed: state.result.configIsDisplayed,
    isDetecting: state.configuration.isDetecting,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({
    openConfig: actions.showResultConfig,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetectionResults);
