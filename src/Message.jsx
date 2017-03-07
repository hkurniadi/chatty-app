import React, {Component} from 'react';

class Message extends Component {
  render() {
  console.log('Rendering <Message />');
    return (
        <ul>
        {this.props.messages.map((message) => {
          return (
          <li key={message.id}>
            <span className="message-username">{message.username}</span>
            <span className="message-content">{message.content}</span>
          </li>
          );
        })}
      </ul>
    );
  }
}

export default Message;
