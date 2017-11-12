// @flow
import * as React from 'react';
import Card, { CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import BinarySelect from 'src/components/BinarySelect';
import messages from 'src/messages';

type Props = {
  depth: number;
  show: boolean;
  uploadType: 'url' | 'file' | '';
  onChangeUploadType: (value: 'left' | 'right') => void;
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
    depth, show, uploadType, onChangeUploadType, onPrev, onNext,
  } = props;

  const selectValue = getSelectValue(uploadType);

  return (
    <Card depth={depth} show={show}>
      <CardTitle>{messages.IMAGE_TO_DETECT}</CardTitle>

      <BinarySelect
        value={selectValue}
        leftLabel={messages.ON_WEB}
        rightLabel={messages.ON_COMPUTER}
        onChange={onChangeUploadType}
      />

      <CardButtons>
        <Button onClick={onPrev}>{messages.PREVIOUS}</Button>
        <Button onClick={onNext} isPrimary>{messages.LAUNCH_DETECTION}</Button>
      </CardButtons>
    </Card>
  );
}


export default SelectFileCard;
