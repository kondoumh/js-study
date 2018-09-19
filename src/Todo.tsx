import * as React from 'react';

interface Props {
    id: string,
    title: string,
    desc: string,
    done: boolean
}

class Todo extends React.Component<Props> {

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
