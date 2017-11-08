// @flow
import React from 'react';
import Card, { CardTitle, CardText } from 'src/components/Card';
import style from './style.scss';

function App() {
  return (
    <div className={style.container}>
      <Card>
        <div>
          <CardTitle>Hello Deepomatic</CardTitle>
          <CardText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga nobis similique nostrum culpa expedita ipsam, quod molestiae ab eius</CardText>
          <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, eaque? Sint, rem voluptatum laboriosam minus aperiam autem vitae neque vel, quam voluptatibus </CardText>
        </div>
      </Card>
    </div>
  );
}

export default App;
