import React, { Component } from 'react'
import WebSocketInstance from './../../websocket.js'

class chat extends Component {

    componentDidMount() {
        WebSocketInstance.connect();
    }


    constructor(props) {
        super(props)
        this.state = {}

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
            from: "christianbaker",
            content: this.state.message,
        };
        WebSocketInstance.newChatMessage(messageObject);
        this.setState({
            message: ''
        });
    }

    renderMessages = (messages) => {
        const currentUser = 'christianbaker'
        return messages.map(message => (
            <li key={message.id}
                className={message.author === currentUser ? 'sent' : 'replies'}>
                <img src='http://emilcarlsson.se/assets/mikeross.png' />
                <p>
                    <small>{message.author}</small>
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
                            <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="" />
                            <p>Mike Ross</p>
                            <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                            <div id="status-options">
                                <ul>
                                    <li id="status-online" className="active"><span className="status-circle"></span>
                                        <p>Online</p>
                                    </li>
                                    <li id="status-away"><span className="status-circle"></span>
                                        <p>Away</p>
                                    </li>
                                    <li id="status-busy"><span className="status-circle"></span>
                                        <p>Busy</p>
                                    </li>
                                    <li id="status-offline"><span className="status-circle"></span>
                                        <p>Offline</p>
                                    </li>
                                </ul>
                            </div>
                            <div id="expanded">
                                <label htmlFor="twitter"><i className="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
                                <input name="twitter" type="text" value="mikeross" />
                                <label htmlFor="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
                                <input name="twitter" type="text" value="ross81" />
                                <label htmlFor="twitter"><i className="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
                                <input name="twitter" type="text" value="mike.ross" />
                            </div>
                        </div>
                    </div>
                    <div id="search">
                        <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                        <input type="text" placeholder="Search contacts..." />
                    </div>
                    <div id="contacts">
                        <ul>
                            <li className="contact">
                                <div className="wrap">
                                    <span className="contact-status online"></span>
                                    <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                    <div className="meta">
                                        <p className="name">Louis Litt</p>
                                        <p className="preview">You just got LITT up, Mike.</p>
                                    </div>
                                </div>
                            </li>
                            <li className="contact active">
                                <div className="wrap">
                                    <span className="contact-status busy"></span>
                                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                    <div className="meta">
                                        <p className="name">Harvey Specter</p>
                                        <p className="preview">Wrong. You take the gun, or you pull out a bigger one. Or, you call
                                        their bluff. Or, you do any one of a hundred and forty six other things.</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="bottom-bar">
                        <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add
                            contact</span></button>
                        <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
                    </div>
                </div>
                <div className="content">
                    <div className="contact-profile">
                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                        <p>username</p>
                        <div className="social-media">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </div>
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
                                <input id="chat-message-input" type="text" placeholder="Write your message..." onChange={this.messageChangeHandler} />
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