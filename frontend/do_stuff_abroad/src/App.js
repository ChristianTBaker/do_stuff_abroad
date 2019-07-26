import React from 'react';
import ReactDom from 'react-dom';
import Chat from './components/chat/chat.js'
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div id="app" >
                <Chat />
            </div>
        );
    }

}

export default App;
