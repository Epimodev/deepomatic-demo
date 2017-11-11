// @flow
import * as React from 'react';
import Card, { CardTitle, CardText, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';

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
      <CardTitle>Select File</CardTitle>
      <CardText>What File ?</CardText>

      <CardButtons>
        <Button onClick={onPrev}>Previous</Button>
        <Button onClick={onNext} isPrimary>Next</Button>
      </CardButtons>
    </Card>
  );
}


export default SelectFileCard;
