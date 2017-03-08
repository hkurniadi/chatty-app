import React, {Component} from 'react';

class ChatBar extends Component {

  handleSubmitChat(event) {
    console.log("Chat message is:", event.target.value);
    if (event.key === "Enter") {
      this.props.handleSubmit(event.target.value);
      // document.querySelector('.chatbar-message').value="";
      event.target.value = '';
    }
  }

  // handleUserName(event) {
  //   console.log("Username is:", event.target.value);
  //   if (event.key === "Enter") {
  //     this.props.
  //   }
  // }

  render() {
  console.log('Rendering <ChatBar />');
    return (
    <footer className="chatbar">
      <input
        className="chatbar-username"
        defaultValue={this.props.currentUser}
        placeholder="Your Name (Optional)"
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
