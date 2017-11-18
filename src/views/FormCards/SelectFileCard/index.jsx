// @flow
import * as React from 'react';
import Card, { CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import BinarySelect from 'src/components/BinarySelect';
import InputText from 'src/components/InputText';
import messages from 'src/messages';

type Props = {
  depth: number;
  show: boolean;
  uploadType: 'url' | 'file' | '';
  onChangeUploadType: (value: 'left' | 'right') => void;
  imageUrl: string;
  onChangeImageUrl: (value: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

function getSelectValue(uploadType: 'url' | 'file' | '') {
  if (uploadType === 'url') return 'left';
  if (uploadType === 'file') return 'right';
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
    onPrev,
    onNext,
  } = props;

  const selectValue = getSelectValue(uploadType);
  const onNextClick = imageUrl ? onNext : null;

  return (
    <Card depth={depth} show={show}>
      <CardTitle>{messages.IMAGE_TO_DETECT}</CardTitle>

      <BinarySelect
        value={selectValue}
        leftLabel={messages.ON_WEB}
        rightLabel={messages.ON_COMPUTER}
        onChange={onChangeUploadType}
      />

      <InputText
        value={imageUrl}
        label={messages.IMAGE_URL}
        placeholder={messages.IMAGE_URL_PLACEHOLDER}
        error="Error message"
        onChange={onChangeImageUrl}
      />

      <CardButtons>
        <Button onClick={onPrev}>{messages.PREVIOUS}</Button>
        <Button onClick={onNextClick} isPrimary>{messages.LAUNCH_DETECTION}</Button>
      </CardButtons>
    </Card>
  );
}


export default SelectFileCard;
