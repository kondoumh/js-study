import * as React from 'react';
import './App.css';

import logo from './logo.svg';

interface TodoProps {
  id: number;
  title: string;
  desc: string;
  done: boolean;
}

class App extends React.Component {
  constructor(props: TodoProps) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: "Hello, React",
          desc: "Start React",
          done: false
        },
        {
          id: 2,
          title: "Hello, Redux",
          desc: "Start Redux",
          done: false
        }
      ]
    };
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
