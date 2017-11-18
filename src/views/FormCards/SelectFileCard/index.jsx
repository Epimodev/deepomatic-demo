// @flow
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import isURL from 'validator/lib/isURL';
import Card, { CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import BinarySelect from 'src/components/BinarySelect';
import InputText from 'src/components/InputText';
import InputImage from 'src/components/InputImage';
import messages from 'src/messages';
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

type Props = {
  depth: number;
  show: boolean;
  uploadType: 'url' | 'file' | '';
  onChangeUploadType: (value: 'left' | 'right') => void;
  imageUrl: string;
  onChangeImageUrl: (value: string) => void;
  onChangeFile: (file: File) => void;
  fileValue: string;
  fileError: string;
  onPrev: () => void;
  onNext: () => void;
}

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
    onChangeUploadType,
    imageUrl,
    onChangeImageUrl,
    onChangeFile,
    fileValue,
    fileError,
    onPrev,
    onNext,
  } = props;

  const selectValue = getSelectValue(uploadType);
  const urlError = getUrlError(imageUrl);
  const onNextClick = submitIsAvailable(uploadType, urlError, fileValue)
    ? onNext
    : null;

  return (
    <Card depth={depth} show={show}>
      <CardTitle>{messages.IMAGE_TO_DETECT}</CardTitle>

      <BinarySelect
        value={selectValue}
        leftLabel={messages.ON_WEB}
        rightLabel={messages.ON_COMPUTER}
        onChange={onChangeUploadType}
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
              onChange={onChangeImageUrl}
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
            onChange={onChangeFile}
          />
        </CSSTransition>
      </div>

      <CardButtons>
        <Button onClick={onPrev}>{messages.PREVIOUS}</Button>
        <Button onClick={onNextClick} isPrimary>{messages.LAUNCH_DETECTION}</Button>
      </CardButtons>
    </Card>
  );
}


export default SelectFileCard;
