import * as React from 'react';
import { postMessage, Message } from '../client';
import { Button, Form, Segment, TextArea } from 'semantic-ui-react';

interface MessageFormProps {
    channelName: string;
}

interface MessageFormState {
    body?: string
}

export class MessageForm extends React.Component<MessageFormProps, MessageFormState> {

    constructor(props: MessageFormProps) {
        super(props);
        this.state = {
            body: ''
        };
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    }

    private handleTextAreaChange(event: React.FormEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        this.setState({ body: event.currentTarget.value });
    }

    public render() {
        return (
            <Segment basic textAlign='center'>
                <Form>
                    <Form.Field>
                        <TextArea
                            autoHeight
                            placeholder='Write your message'
                            value={this.state.body}
                            onChange={this.handleTextAreaChange} />
                    </Form.Field>
                    <Button primary type='submit'>Send</Button>
                </Form>
                <p>入力中の値: {this.state.body}</p>
            </Segment>
        );
    }
}
