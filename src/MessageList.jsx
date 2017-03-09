import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {
    console.log('Rendering <MessageList />');
    return (
      <main className="messages">
          {this.props.messages.map((message, index) => {
            return (
              <Message
                key={message.key}
                type={message.type}
                username={message.username}
                content={message.content}
                color={message.color}
              />
            );
          })}
      </main>
    );
  }
}

export default MessageList;
