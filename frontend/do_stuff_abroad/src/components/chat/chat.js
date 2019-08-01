import React, { Component } from 'react'
import WebSocketInstance from './../../websocket.js'
import './Chat.css'
import Weather from './../Weather/Weather.js'

class chat extends Component {

    componentDidMount() {
        WebSocketInstance.connect(this.props.city, this.props.activity);
    }


    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.setMessages.bind(this),
                this.addMessage.bind(this))
            WebSocketInstance.fetchMessages(this.props.currentUser)
        })
    }

    waitForSocketConnection(callback) {
        const component = this
        setTimeout(
            function () {
                if (WebSocketInstance.state() === 1) {
                    console.log('connection is secure')
                    callback()
                    return
                } else {
                    console.log('waiting for connection...')
                    component.waitForSocketConnection(callback)
                }
                callback()
            }, 100)
    }

    addMessage(message) {
        this.setState({
            messages: [...this.state.messages, message]
        })
    }

    setMessages(messages) {
        this.setState({
            messages: messages.reverse()
        })
    }

    messageChangeHandler = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    sendMessageHandler = (e) => {
        e.preventDefault();
        const messageObject = {
            from: this.props.username,
            content: this.state.message,
        };
        WebSocketInstance.newChatMessage(messageObject);
        this.setState({
            message: ''
        });
    }

    renderMessages = (messages) => {
        const currentUser = this.props.username
        return messages.map(message => (
            <li key={message.id}
                className={message.author === currentUser ? 'sent' : 'replies'}>
                <img src='http://emilcarlsson.se/assets/mikeross.png' />
                <p>
                    <small>User: {message.author}</small>
                    <br />
                    {message.content}
                    <br />
                    <small>{Math.round((new Date().getTime() - new Date(message.timestamp).getTime()) / 60000)} minutes ago</small>
                </p>
            </li>
        ))
    }

    render() {
        const messages = this.state.messages
        return (
            <div id="frame">
                <div id="sidepanel">
                    <div id="profile">
                        <div className="wrap">
                            <Weather city={this.props.city} />
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="contact-profile">
                        <p className='indent'>Room: {this.props.city} - {this.props.activity}</p>
                    </div>
                    <div className="messages">
                        <ul id="chat-log">
                            {
                                messages &&
                                this.renderMessages(messages)
                            }
                        </ul>
                    </div>
                    <div className="message-input">
                        <form onSubmit={this.sendMessageHandler}>
                            <div className="wrap">
                                <input value={this.state.message} id="chat-message-input" type="text" placeholder="Write your message..." onChange={this.messageChangeHandler} />
                                <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                                <button id="chat-message-submit" className="submit">
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default chat