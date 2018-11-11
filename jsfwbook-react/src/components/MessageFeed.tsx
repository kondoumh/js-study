import * as React from 'react';
import { fetchMessages, Message } from '../client';
import { Segment, image, Comment, Header } from 'semantic-ui-react';

interface MessageFeedProps {
    channelName: string;
}

interface MessageFeedState {
    messages: Message[];
}

export class MessageFeed extends React.Component<MessageFeedProps, MessageFeedState> {

    constructor(props: MessageFeedProps) {
        super(props);
        this.state = {
            messages: []
        };
    }
}