// @flow
import * as React from 'react';
import Card, { CardTitle, CardText, CardButtons } from 'src/components/Card';
import Button from 'src/components/Button';
import Checkbox from 'src/components/Checkbox';
import messages from 'src/messages';
import style from './style.scss';

type Props = {
  depth: number;
  show: boolean;
  selected: string;
  onChange: (name: string, value: boolean) => void;
  onPrev: () => void;
  onNext: () => void;
}

const detectionTypes = [
  { name: 'fashion', label: messages.FASHION, color: 'pink' },
  { name: 'furniture', label: messages.FURNITURE, color: 'orange' },
  { name: 'weapons', label: messages.WEAPONS, color: 'gray' },
];

function SelectTypeCard(props: Props) {
  const {
    depth, show, selected, onChange, onPrev, onNext,
  } = props;

  return (
    <Card depth={depth} show={show}>
      <CardTitle>{messages.TYPE_TO_DETECT}</CardTitle>
      <CardText>{messages.WHAT_TYPE_DETECT}</CardText>

      <div className={style.types}>
        {detectionTypes.map(({ name, label, color }) => (
          <Checkbox
            key={name}
            name={name}
            checked={selected === name}
            color={color}
            onChange={onChange}
          >
            {label}
          </Checkbox>
        ))}
      </div>

      <CardButtons>
        <Button onClick={onPrev}>{messages.PREVIOUS}</Button>
        <Button onClick={onNext} isPrimary>{messages.NEXT}</Button>
      </CardButtons>
    </Card>
  );
}


export default SelectTypeCard;
