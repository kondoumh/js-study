import * as React from "react";

class TodoList extends React.Component<any, any> {

    public render() {
        return (
            <ul>
                {this.props.items.map((item, i) => (
                    <li key={item.id}>
                    <input type="button" value="☓" onClick={this.handleClick} />{item.text}</li>
                ))}
            </ul>
        )
    }

    private handleClick(i: any) {
        this.state.todo.splice(i, 1);
        this.setState({
            todo : this.state.todo
        });
    }
}

export default TodoList;
