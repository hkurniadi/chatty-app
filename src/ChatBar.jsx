import React, {Component} from 'react';

class ChatBar extends Component {

  //These handlers just send the new values back to the parent - 'Actions Up'
  handleSubmitName(event) {
    if (event.key === "Enter") {
      this.props.handleNewUsername(event.target.value);
    }
  }

  handleSubmitChat(event) {
    if (event.key === "Enter") {
      this.props.handleNewMessage(event.target.value);
      event.target.value = '';
    }
  }

  render() {
  console.log('Rendering <ChatBar />');
    return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        defaultValue={this.props.currentUser}
        placeholder="Your Name (Optional)"
        onKeyPress={this.handleSubmitName.bind(this)}
      />
      <input
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onKeyPress={this.handleSubmitChat.bind(this)}
      />
    </footer>
    );
  }
}

export default ChatBar
