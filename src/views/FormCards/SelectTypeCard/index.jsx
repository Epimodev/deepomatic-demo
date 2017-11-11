// @flow
import * as React from 'react';
import Card, { CardTitle, CardText, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import messages from 'src/messages';

type Props = {
  depth: number;
  show: boolean;
  onPrev: () => void;
  onNext: () => void;
}

function SelectTypeCard(props: Props) {
  const {
    depth, show, onPrev, onNext,
  } = props;

  return (
    <Card depth={depth} show={show}>
      <CardTitle>{messages.TYPE_TO_DETECT}</CardTitle>
      <CardText>{messages.WHAT_TYPE_DETECT}</CardText>

      <CardButtons>
        <Button onClick={onPrev}>{messages.PREVIOUS}</Button>
        <Button onClick={onNext} isPrimary>{messages.NEXT}</Button>
      </CardButtons>
    </Card>
  );
}


export default SelectTypeCard;
