import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {
    console.log('Rendering <MessageList />');
    return (
      <main className="messages">
        <div className="message">
          <Message messages={this.props.messages} />
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

export default MessageList;
