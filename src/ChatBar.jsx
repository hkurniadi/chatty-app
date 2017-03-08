import React, {Component} from 'react';

class ChatBar extends Component {

  handleSubmitChat(event) {
    console.log("in event", event);
    if (event.key === "Enter") {
      this.props.showNewMessage(event.target.value);
      document.querySelector('.chatbar-message').value="";
    }
  }

  render() {
  console.log('Rendering <ChatBar />');
    return (
    <footer className="chatbar">
      <input className="chatbar-username" defaultValue={this.props.currentUser} placeholder="Your Name (Optional)" />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleSubmitChat.bind(this)} />
    </footer>
    );
  }
}

export default ChatBar
