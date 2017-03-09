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

      activeUsers: ''
    };

    this.socket = new WebSocket("ws://localhost:3001");

    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeCurrentUser = this.changeCurrentUser.bind(this);
    this.changeNumOfOnlineUsers = this.changeNumOfOnlineUsers.bind(this);
    this.sendMessageToServer = this.sendMessageToServer.bind(this);
  }

  addNewMessage(newMessage) {
    this.setState({messages: newMessage});
  }

  changeCurrentUser(newUsername) {
    this.setState({currentUser: {name: newUsername}});
  }

  changeNumOfOnlineUsers(counts) {
    this.setState({activeUsers: counts})
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
          //let newMessage = this.state.messages.concat({data});
          let newMessage = this.state.messages.concat({
            key: data.key,
            type: type,
            username: data.username,
            content: data.content
          })
          this.addNewMessage(newMessage);
          break;
        case "incomingNotification":
          // let newNotification = this.state.messages.concat({data});
          let newNotification = this.state.messages.concat({
            key: data.key,
            type: type,
            content: data.notificationMessage
          })
          this.addNewMessage(newNotification);
          break;
        case "activeUsers":
          this.changeNumOfOnlineUsers(data.counts);
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
          <a className="num-users">{this.state.activeUsers + " users online"}</a>
        </nav>
        <MessageList messages={this.state.messages} />
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
