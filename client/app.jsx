import React from 'react';
import Question from './';
import Form from './Components/Form';

const App = () => {
  return (
    <>
    <div className="app-wrapper">
      <nav></nav>
      <div className="center">
        <h1>WorkBrew</h1>
        <h3>Your favorite remote workspaces, all in one place!</h3>
        <Form />
      </div>
    </div>
    </>
  );
};

export default App;
