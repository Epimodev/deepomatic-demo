// @flow
import * as React from 'react';
import Transition from 'src/components/no-design/Transition';
import isURL from 'validator/lib/isURL';
import type { UploadType } from 'src/services/deepomatic/types';
import BinarySelect from 'src/components/BinarySelect';
import InputText from 'src/components/InputText';
import InputImage from 'src/components/InputImage';
import messages from 'src/messages';
import style from './style.scss';

type Props = {
  +uploadType: UploadType;
  +imageUrl: string;
  +urlError: string;
  +fileValue: string;
  +fileError: string;
  +changeUploadType: (value: 'left' | 'right') => void;
  +changeImageUrl: (value: string) => void;
  +changeFile: (file: File) => void;
}

const URL_CLASSNAMES = {
  enter: style.inputUrlEnter,
  enterActive: style.inputUrlEnterActive,
  exit: style.inputUrlExit,
  exitActive: style.inputUrlExitActive,
};
const FILE_CLASSNAMES = {
  enter: style.inputFileEnter,
  enterActive: style.inputFileEnterActive,
  exit: style.inputFileExit,
  exitActive: style.inputFileExitActive,
};

function getSelectValue(uploadType: UploadType) {
  if (uploadType === 'url') return 'left';
  return 'right';
}

function ImageSelector(props: Props) {
  const {
    uploadType,
    imageUrl,
    urlError,
    fileValue,
    fileError,
    changeUploadType,
    changeImageUrl,
    changeFile,
  } = props;

  const selectValue = getSelectValue(uploadType);

  return (
    <React.Fragment>
      <BinarySelect
        value={selectValue}
        leftLabel={messages.ON_WEB}
        rightLabel={messages.ON_COMPUTER}
        onChange={changeUploadType}
      />

      <div className={style.inputContainer}>
        <Transition
          in={uploadType === 'url'}
          classNames={URL_CLASSNAMES}
          timeout={400}
        >
          <div className={style.animationContainer}>
            <InputText
              value={imageUrl}
              label={messages.IMAGE_URL}
              placeholder={messages.IMAGE_URL_PLACEHOLDER}
              error={urlError}
              onChange={changeImageUrl}
            />
          </div>
        </Transition>

        <Transition
          in={uploadType === 'file'}
          classNames={FILE_CLASSNAMES}
          timeout={400}
        >
          <div className={style.animationContainer}>
            <InputImage
              label={messages.CLICK_OR_DROP_FILE}
              successLabel={messages.FILE_SUCCESS}
              error={fileError}
              value={fileValue}
              onChange={changeFile}
            />
          </div>
        </Transition>
      </div>
    </React.Fragment>
  );
}

ImageSelector.defaultProps = {};

export default ImageSelector;
