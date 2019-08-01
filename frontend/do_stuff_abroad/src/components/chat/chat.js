import React, { Component } from 'react'
import WebSocketInstance from './../../websocket.js'
import './Chat.css'
import Weather from './../Weather/Weather.js'

class chat extends Component {

    componentDidMount() {
        WebSocketInstance.connect(this.props.city, this.props.activity)
        this.scrollToBottom()
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

    renderTimestamp = timestamp => {
        let prefix = ''
        const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime()) / 60000)
        if (timeDiff < 60 && timeDiff > 1) {
            prefix = `${timeDiff} minutes age`
        } else if (timeDiff < 24 * 60 && timeDiff > 60) {
            prefix = `${Math.round(timeDiff / 60)} hours ago`
        } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
            prefix = `${Math.round(timeDiff / (60 * 24))} days ago`
        } else {
            prefix = `${new Date(timestamp)}`
        }
        return prefix
    }

    renderMessages = (messages) => {
        const currentUser = this.props.username
        return messages.map(message => (
            <li key={message.id}
                className={message.author === currentUser ? 'sent' : 'replies'}>
                <p>
                    <small>User: {message.author}</small>
                    <br />
                    {message.content}
                    <br />
                    <small>
                        {this.renderTimestamp(message.timestamp)}
                    </small>
                </p>
            </li>
        ))
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        const messages = this.state.messages
        return (
            <div id="frame">
                <div id="sidepanel">
                    <div id="profile">
                        <h3 id='weather_header'>Current Weather</h3>
                        <Weather city={this.props.city} />
                    </div>
                </div>
                <div className="content">
                    <div className="contact-profile">
                        <p className='tab'>Room: {this.props.city} - {this.props.activity}</p>
                    </div>
                    <div className="messages">
                        <ul id="chat-log">
                            {
                                messages &&
                                this.renderMessages(messages)
                            }
                            <div style={{ float: "left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                            </div>
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