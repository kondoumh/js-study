import * as React from 'react';

class Todo extends React.Component {

    render() {
        const className = "undone";
        const link = this.props.done ? "redo" : "done";
        return(
            <li className={className}>
                <span>{this.props.id}</span>
                <span>:{this.props.title}</span>
                <a href="">{link}</a>
                <p>{this.props.desc}</p>
            </li>
        );
    }
}

export default Todo
