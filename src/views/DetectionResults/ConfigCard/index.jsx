// @flow
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { State, AppDispatch } from 'src/store';
import type { UploadType } from 'src/services/deepomatic/types';
import { imageIsFilled, getUrlError } from 'src/utils/formUtils';
import Card, { CardContent, CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import Checkbox from 'src/components/Checkbox';
import detectionTypes from 'src/constants/detectionTypes';
import ImageSelector from 'src/components/ImageSelector';
import messages from 'src/messages';
import * as actions from '../actions';
import * as formActions from '../../FormCards/actions';
import style from './style.scss';

type ComponentProps = {
  +show: boolean;
}

type StateProps = {
  +selectedType: string;
  +uploadType: UploadType;
  +imageUrl: string;
  +fileValue: string;
  +fileError: string;
}

type DispatchProps = {
  +changeType: (name: string, value: boolean) => void;
  +changeUploadType: (value: 'left' | 'right') => void;
  +changeImageUrl: (value: string) => void;
  +changeFile: (file: File) => void;
  +hideConfig: () => void;
  +submit: () => void;
}

type Props = ComponentProps & StateProps & DispatchProps

function ConfigCard(props: Props) {
  const {
    show,
    selectedType, uploadType, imageUrl, fileValue, fileError,
    changeType, changeUploadType, changeImageUrl, changeFile, hideConfig, submit,
  } = props;

  const urlError = getUrlError(imageUrl);
  const formIsFilled = !!selectedType && imageIsFilled(uploadType, urlError, fileValue)
  const onSubmit = formIsFilled
    ? submit
    : null;

  return (
    <Card show={show} className={style.configCard}>
      <CardContent>
        <CardTitle>{messages.TYPE_TO_DETECT}</CardTitle>
        <div className={style.types}>
          {detectionTypes.map(({ name, label, color }) => (
            <Checkbox
              key={name}
              name={name}
              checked={selectedType === name}
              color={color}
              onChange={changeType}
            >
              {label}
            </Checkbox>
          ))}
        </div>

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
          <Button onClick={hideConfig}>
            {messages.CANCEL}
          </Button>
          <Button onClick={onSubmit} isPrimary>
            {messages.RELAUNCH_DETECTION}
          </Button>
        </CardButtons>
      </CardContent>
    </Card>
  );
}

function mapStateToProps(state: State): StateProps {
  return {
    selectedType: state.configuration.detectionType,
    uploadType: state.configuration.uploadType,
    imageUrl: state.configuration.imageUrl,
    fileValue: state.configuration.fileValue,
    fileError: state.configuration.fileError,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({
    changeType: formActions.changeType,
    changeUploadType: formActions.changeUploadType,
    changeImageUrl: formActions.changeImageUrl,
    changeFile: formActions.changeFile,
    submit: formActions.submitConfiguration,
    hideConfig: actions.hideResultConfig,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigCard);
