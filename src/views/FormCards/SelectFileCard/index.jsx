// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import type { UploadType } from 'src/services/deepomatic/types';
import { imageIsFilled, getUrlError } from 'src/utils/formUtils';
import Card, { CardContent, CardOverlay, CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import ImageSelector from 'src/components/ImageSelector';
import AppLoader from 'src/components/AppLoader';
import AppError from 'src/components/AppError';
import messages from 'src/messages';
import * as actions from '../actions';

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
  +detectionFailed: boolean;
}

type DispatchProps = {
  +changeUploadType: (value: 'left' | 'right') => void;
  +changeImageUrl: (value: string) => void;
  +changeFile: (file: File) => void;
  +previousStep: () => void;
  +submit: () => void;
  +closeError: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

function SelectFileCard(props: Props) {
  const {
    depth,
    show,
    uploadType,
    changeUploadType,
    imageUrl,
    isDetecting,
    detectionFailed,
    changeImageUrl,
    changeFile,
    fileValue,
    fileError,
    previousStep,
    closeError,
    submit,
  } = props;

  const urlError = getUrlError(imageUrl);
  const onNextClick = imageIsFilled(uploadType, urlError, fileValue)
    ? submit
    : null;

  return (
    <Card depth={depth} show={show} loading={isDetecting} loadingMessage={messages.ANALYSING_IMAGE}>
      <CardContent>
        <CardTitle>{messages.IMAGE_TO_DETECT}</CardTitle>

        <ImageSelector
          uploadType={uploadType}
          imageUrl={imageUrl}
          urlError={urlError}
          fileValue={fileValue}
          fileError={fileError}
          changeUploadType={changeUploadType}
          changeImageUrl={changeImageUrl}
          changeFile={changeFile}
        />

        <CardButtons>
          <Button onClick={previousStep}>{messages.PREVIOUS}</Button>
          <Button onClick={onNextClick} isPrimary>{messages.LAUNCH_DETECTION}</Button>
        </CardButtons>
      </CardContent>
      <CardOverlay active={isDetecting || detectionFailed}>
        <AppLoader show={isDetecting} message={messages.ANALYSING_IMAGE} />
        <AppError show={detectionFailed} onCancel={closeError} onRetry={submit} />
      </CardOverlay>
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
    detectionFailed: state.configuration.detectionFailed,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({
    changeUploadType: actions.changeUploadType,
    changeImageUrl: actions.changeImageUrl,
    changeFile: actions.changeFile,
    previousStep: actions.previousStep,
    closeError: actions.closeError,
    submit: actions.submitConfiguration,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFileCard);
