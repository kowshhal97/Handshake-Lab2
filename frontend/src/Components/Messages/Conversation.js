import React, { Component } from 'react';
import { ChatFeed, Message } from 'react-chat-ui'
import axios from 'axios';
import { Input, Button } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';

import './Messages.css'

import {connect} from 'react-redux';

class Messages extends Component {
  state = {
    messages: [
    ],
    newMessage: {

    }
    //...
  };

  typeMessage = (e) => {
    this.setState({
      newMessage: {
        text: e.target.value,
        sender: this.props.user.name
      }
    })
  }

  componentDidMount = () => {
      console.log(this.props.conversationId)
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/messages/'+this.props.conversationId)
      .then(response => {
        let messages = []
        for (let i of response.data.messages) {
          if (i.sender === this.props.user.name) {
            messages.push(
              new Message({
                id: 0,
                message: i.text,
                senderName: i.sender
              })
            )
          }
          else {
            messages.push(
              new Message({
                id: 1,
                message: i.text,
                senderName: i.sender
              }))
          }
        }
        this.props.messagesUpdate(messages);
        this.setState({ messages: messages })
      }).catch((e) => {
        console.log(e)
        window.alert(e)
      })
  };

  sendMessage = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/messages/'+this.props.conversationId, this.state.newMessage)
      .then(response => {
        this.refs.input.clear();
        let messages = []
        for (let i of response.data.messages) {
          if (i.sender === this.props.user.name) {
            messages.push(
              new Message({
                id: 0,
                message: i.text,
                senderName: i.sender
              })
            )
          }
          else {
            messages.push(
              new Message({
                id: 1,
                message: i.text,
                senderName: i.sender
              }))
          }
        }
        this.props.messagesUpdate(messages);
        this.setState({ messages: messages })
      }).catch(() => {
        window.alert("FAIL")
      });

  }
  render = () => {
    console.log("hello")
      console.log(this.props)
let chatFeed=null;
    if(this.props.messages.length!=0)
     chatFeed=(
        <div>
    <div className="chatFeeed">

          <ChatFeed
            messages={this.props.messages}
            showSenderName
            bubbleStyles={
              {
                text: {
                  fontSize: 17
                },
                chatbubble: {
                  borderRadius: 20,
                  padding: 20
                }
              }
            }
          />
          </div>
          <Input
            placeholder="Type here..."
            multiline={true}
            onChange={this.typeMessage}
            ref='input'
            rightButtons={
              <Button
                color='white'
                backgroundColor='black'
                text='Send'
                onClick={this.sendMessage} />
            } />
            
            </div>
            );


    return <div style={{width: '100%'}}>
        {chatFeed}

    </div>
  }
}


const mapDispatchToProps = dispatch => {
    return ({
        
        messagesUpdate: ( message) => dispatch({type: 'MESSAGE', message: message})

    });
};

const mapStateToProps = state => {
    return {
        user: state.user,
        messages:state.messages
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Messages);

