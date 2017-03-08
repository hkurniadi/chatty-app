import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      systemNotifications: {}
    };

    this.socket = new WebSocket("ws://localhost:3001");

    this.showNewMessage = this.showNewMessage.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
  }

  showNewMessage(newMessage) {
    let msg = this.state.messages.concat({
      username: this.state.currentUser.name,
      content: newMessage
    });
    this.setState({messages: msg});
  }

  sendMessageToServer(msg) {
    console.log('Message is', msg);
    this.socket.send(JSON.stringify(msg));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = () => {
      console.log('Connected to server');
    }
  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} systemNotifications={this.state.systemNotifications} />
        <ChatBar currentUser={this.state.currentUser.name} handleSubmit={this.sendMessageToServer} />
      </div>
    );
  }
}

export default App;
