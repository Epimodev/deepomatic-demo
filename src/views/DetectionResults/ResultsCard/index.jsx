// @flow
import * as React from 'react';
import Card, { CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import messages from 'src/messages';

type Props = {
  +detectedObjects: string[];
  +containerClass: string;
}

function ResultCard(props: Props) {
  const { detectedObjects, containerClass } = props;

  return (
    <Card className={containerClass}>
      <CardTitle>{messages.DETECTION_RESULTS}</CardTitle>

      <span>{messages.DETECTED_ITEMS}</span>
      <ul>
        {detectedObjects.map(object => <li key={object}>{object}</li>)}
      </ul>

      <CardButtons>
        <Button onClick={() => console.log('change config')} isPrimary>
          {messages.CHANGE_CONFIGURATION}
        </Button>
      </CardButtons>
    </Card>
  );
}

ResultCard.defaultProps = {};

export default ResultCard;
