import React, { Component } from 'react'
import LoginPage from './pages/LoginPage.js'
import NavBar from './components/NavBar/NavBar.js'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Provider } from './context'

class App extends Component {
    render() {
        return (
            <Provider>
                <Router>
                    <div>
                        <NavBar />
                        {/* <Route exact path="/" component={HomePage} /> */}
                        <Route exact path="/login" component={LoginPage} />
                        {/* <Route exact path="/chat" component={ChatPage} /> */}
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
