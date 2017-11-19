// @flow
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isURL from 'validator/lib/isURL';
import type { State, AppDispatch } from 'src/store';
import type { UploadType } from 'src/services/deepomatic/types';
import Card, { CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import BinarySelect from 'src/components/BinarySelect';
import InputText from 'src/components/InputText';
import InputImage from 'src/components/InputImage';
import messages from 'src/messages';
import * as actions from '../actions';
import style from './style.scss';

const URL_CLASSNAMES = {
  enter: style.inputUrlEnter,
  enterActive: style.inputUrlEnterActive,
  exit: style.inputUrlExit,
  exitActive: style.inputUrlExitActive,
};
const FILE_CLASSNAMES = {
  enter: style.fileUrlEnter,
  enterActive: style.fileUrlEnterActive,
  exit: style.fileUrlExit,
  exitActive: style.fileUrlExitActive,
};

type ComponentProps = {
  +depth: number;
  +show: boolean;
}

type StateProps = {
  +uploadType: UploadType;
  +imageUrl: string;
  +fileValue: string;
  +fileError: string;
  +isDetecting: boolean;
}

type DispatchProps = {
  +changeUploadType: (value: 'left' | 'right') => void;
  +changeImageUrl: (value: string) => void;
  +changeFile: (file: File) => void;
  +previousStep: () => void;
  +submit: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

function getSelectValue(uploadType: 'url' | 'file' | '') {
  if (uploadType === 'url') return 'left';
  if (uploadType === 'file') return 'right';
  return '';
}

function submitIsAvailable(uploadType: 'url' | 'file' | '', imageUrlError: string, fileValue: string): boolean {
  switch (uploadType) {
    case 'url':
      return !imageUrlError;
    case 'file':
      return !!fileValue;
    default:
      return false;
  }
}

function getUrlError(imageUrl: string): string {
  if (!imageUrl) return messages.EMPTY_URL;
  if (!isURL(imageUrl)) return messages.INVALID_URL;
  return '';
}

function SelectFileCard(props: Props) {
  const {
    depth,
    show,
    uploadType,
    changeUploadType,
    imageUrl,
    isDetecting,
    changeImageUrl,
    changeFile,
    fileValue,
    fileError,
    previousStep,
    submit,
  } = props;

  const selectValue = getSelectValue(uploadType);
  const urlError = getUrlError(imageUrl);
  const onNextClick = submitIsAvailable(uploadType, urlError, fileValue)
    ? submit
    : null;

  return (
    <Card depth={depth} show={show} loading={isDetecting} loadingMessage={messages.ANALYSING_IMAGE}>
      <CardTitle>{messages.IMAGE_TO_DETECT}</CardTitle>

      <BinarySelect
        value={selectValue}
        leftLabel={messages.ON_WEB}
        rightLabel={messages.ON_COMPUTER}
        onChange={changeUploadType}
      />

      <div className={style.inputContainer}>
        <CSSTransition
          in={uploadType === 'url'}
          classNames={URL_CLASSNAMES}
          timeout={400}
          mountOnEnter
          unmountOnExit
        >
          <div className={style.inputUrl}>
            <InputText
              value={imageUrl}
              label={messages.IMAGE_URL}
              placeholder={messages.IMAGE_URL_PLACEHOLDER}
              error={urlError}
              onChange={changeImageUrl}
            />
          </div>
        </CSSTransition>

        <CSSTransition
          in={uploadType === 'file'}
          classNames={FILE_CLASSNAMES}
          timeout={400}
          mountOnEnter
          unmountOnExit
        >
          <InputImage
            label={messages.CLICK_OR_DROP_FILE}
            successLabel={messages.FILE_SUCCESS}
            error={fileError}
            value={fileValue}
            onChange={changeFile}
          />
        </CSSTransition>
      </div>

      <CardButtons>
        <Button onClick={previousStep}>{messages.PREVIOUS}</Button>
        <Button onClick={onNextClick} isPrimary>{messages.LAUNCH_DETECTION}</Button>
      </CardButtons>
    </Card>
  );
}

function mapStateToProps(state: State): StateProps {
  return {
    uploadType: state.configuration.uploadType,
    imageUrl: state.configuration.imageUrl,
    fileValue: state.configuration.fileValue,
    fileError: state.configuration.fileError,
    isDetecting: state.configuration.isDetecting,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({
    changeUploadType: actions.changeUploadType,
    changeImageUrl: actions.changeImageUrl,
    changeFile: actions.changeFile,
    previousStep: actions.previousStep,
    submit: actions.submitConfiguration,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFileCard);
