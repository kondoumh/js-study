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

    private handleClick(e: any) {
        alert(e);
    }
}

export default TodoList;
