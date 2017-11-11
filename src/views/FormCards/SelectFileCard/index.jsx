// @flow
import * as React from 'react';
import Card, { CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import messages from 'src/messages';

type Props = {
  depth: number;
  show: boolean;
  onPrev: () => void;
  onNext: () => void;
}

function SelectFileCard(props: Props) {
  const {
    depth, show, onPrev, onNext,
  } = props;

  return (
    <Card depth={depth} show={show}>
      <CardTitle>{messages.IMAGE_TO_DETECT}</CardTitle>

      <CardButtons>
        <Button onClick={onPrev}>{messages.PREVIOUS}</Button>
        <Button onClick={onNext} isPrimary>{messages.LAUNCH_DETECTION}</Button>
      </CardButtons>
    </Card>
  );
}


export default SelectFileCard;
