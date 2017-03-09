import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {
    console.log('Rendering <MessageList />');
    return (
      <main className="messages">
          {this.props.messages.map((message, index) => {
            return (
              <Message key={message.key} username={message.username} content={message.content}  />
            );
          })}
        <div className="message system">
          { (this.props.notification) ? this.props.notification : null }
        </div>
      </main>
    );
  }
}

export default MessageList;
