// @flow
import React from 'react';
import Card from 'src/components/Card';
import style from './style.scss';

function App() {
  return (
    <div className={style.container}>
      <Card>
        <div>
          Hello Deepomatic
        </div>
      </Card>
    </div>
  );
}

export default App;
