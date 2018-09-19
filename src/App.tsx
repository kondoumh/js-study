import * as React from 'react';
import TodoList from './TodoList'
import './App.css';

import logo from './logo.svg';

interface Props {
  todos: TodoList
}

class App extends React.Component<Props> {
  constructor(props: Props) {
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
