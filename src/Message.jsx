import React, {Component} from 'react';

class Message extends Component {
  render() {
  console.log('Rendering <Message />');
    return (
      this.props.type === 'incomingNotification' ?
        <div className="message system">
          {this.props.content}
        </div>
        :
        <div className="message">
          <span className="message-username" style={this.props.color}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
    );
  }
}

export default Message;
