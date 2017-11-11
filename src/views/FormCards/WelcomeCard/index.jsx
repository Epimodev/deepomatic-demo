// @flow
import * as React from 'react';
import Card, { CardTitle, CardText, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';

type Props = {
  depth: number;
  onStart: () => void;
}

function WelcomeCard(props: Props) {
  const { depth, onStart } = props;

  return (
    <Card depth={depth} show>
      <CardTitle>Hello Deepomatic</CardTitle>
      <CardText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga nobis similique nostrum culpa expedita ipsam, quod molestiae ab eius</CardText>
      <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, eaque? Sint, rem voluptatum laboriosam minus aperiam autem vitae neque vel, quam voluptatibus </CardText>

      <CardButtons>
        <Button onClick={onStart} isPrimary>Start</Button>
      </CardButtons>
    </Card>
  );
}


export default WelcomeCard;
