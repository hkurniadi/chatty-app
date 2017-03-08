import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {
    console.log('Rendering <MessageList />');
    return (
      <main className="messages">
          {this.props.messages.map((message, index) => {
            return (
              <Message username={message.username} content={message.content} key={index} />
            );
          })}
        <div className="message system">
          { (this.props.systemNotifications) ? <Message name={this.props.systemNotifications.name} systemMessage={this.props.systemNotifications.message} /> : null}
        </div>
      </main>
    );
  }
}

export default MessageList;
