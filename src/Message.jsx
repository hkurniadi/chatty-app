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
          <span className="message-content">
            {this.props.content.replace(/\bhttps?\S+(\.png|\.jpg|\.gif)\b/, "")}
            {/\bhttps?\S+(\.png|\.jpg|\.gif)\b/.test(this.props.content) ?
              <img className="url-img" src={/\bhttps?\S+(\.png|\.jpg|\.gif)\b/.exec(this.props.content)[0]} />
              :
              null
            }
          </span>
        </div>
    );
  }
}

export default Message;
