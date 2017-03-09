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

      notification: ''
    };

    this.socket = new WebSocket("ws://localhost:3001");

    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeCurrentUser = this.changeCurrentUser.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
  }

  addNewMessage(newMessage) {
    this.setState({messages: newMessage});
  }

  changeCurrentUser(newUsername) {
    this.setState({currentUser: {name: newUsername}});
  }

  sendMessageToServer(message, type) {
    if (type === 'postMessage') {
      let newChat = {
        type: type,
        username: this.state.currentUser.name,
        content: message
      };
      this.socket.send(JSON.stringify(newChat));
    } else if (type === 'postNotification') {
      let newNotification = {
        type: type,
        notificationMessage: message
      };
      this.socket.send(JSON.stringify(newNotification));
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = () => {
      console.log('Connected to server');
    }

    this.socket.onmessage = (event) => {
      let data = JSON.parse(event.data);
      console.log('data are', data);
      let type = data.type;
      console.log('type is', type);

      switch (type) {
        case "incomingMessage":
          console.log("it's entering", type);
          let newMessage = this.state.messages.concat({
            key: data.key,
            username: data.username,
            content: data.content
          })
          this.addNewMessage(newMessage);
          break;
        case "incomingNotification":
          console.log("it's entering", type);
          this.setState({notification: data.notificationMessage});
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + type);
      }
    }
  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList
          messages={this.state.messages}
          notification={this.state.notification}
        />
        <ChatBar
          currentUser={this.state.currentUser.name}
          handleNewMessage={this.sendMessageToServer}
          handleNewUsername={this.changeCurrentUser}
        />
      </div>
    );
  }
}

export default App;
