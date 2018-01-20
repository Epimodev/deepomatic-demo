// @flow
import * as React from 'react';
import Card, { CardTitle, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import messages from 'src/messages';

type Props = {
  +hidden: boolean;
  +detectedObjects: string[];
  +containerClass: string;
  +openConfig: () => void;
}

function ResultCard(props: Props) {
  const {
    hidden, detectedObjects, containerClass, openConfig,
  } = props;

  const cardDepth = hidden ? 1 : 0;

  return (
    <Card depth={cardDepth} className={containerClass}>
      <CardTitle>{messages.DETECTION_RESULTS}</CardTitle>

      <span>{messages.DETECTED_ITEMS}</span>
      <ul>
        {detectedObjects.map(object => <li key={object}>{object}</li>)}
      </ul>

      <CardButtons>
        <Button onClick={openConfig} isPrimary>
          {messages.CHANGE_CONFIGURATION}
        </Button>
      </CardButtons>
    </Card>
  );
}

ResultCard.defaultProps = {};

export default ResultCard;
