import React, {Component} from 'react';

class ChatBar extends Component {

  //These handlers just send the new values back to the parent - 'Actions Up'
  handleSubmitName(event) {
    if (event.key === "Enter") {
      let type = 'postNotification';
      let newUsername = event.target.value;
      let notificationMessage = "User " + this.props.currentUser + " changed their name to " + newUsername;
      this.props.handleNewMessage(notificationMessage, type);
      this.props.handleNewUsername(newUsername);
    }
  }

  handleSubmitChat(event) {
    if (event.key === "Enter") {
      let type = 'postMessage';
      let newMessage = event.target.value;
      this.props.handleNewMessage(newMessage, type);
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
