import * as React from 'react';
import "./App.css";
import logo from "./logo.svg";
import TodoList from './TodoList';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: ""};
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{"Add #" + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }

  private handleChange(e: any) {
    this.setState({text: e.target.value});
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      text: this.state.text
    }
    this.setState((prevState: any) => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }
}

export default App;
