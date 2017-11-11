// @flow
import * as React from 'react';
import Card, { CardTitle, CardText, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import messages from 'src/messages';

type Props = {
  depth: number;
  onStart: () => void;
}

function WelcomeCard(props: Props) {
  const { depth, onStart } = props;

  return (
    <Card depth={depth} show>
      <CardTitle>{messages.WELCOME}</CardTitle>
      <CardText>{messages.WELCOME_FIRST_SENTENCE}</CardText>
      <CardText>{messages.WELCOME_SECOND_SENTENCE}</CardText>

      <CardButtons>
        <Button onClick={onStart} isPrimary>{messages.START}</Button>
      </CardButtons>
    </Card>
  );
}


export default WelcomeCard;
