import React, { Component } from 'react'
import NavBar from './components/NavBar/NavBar.js'
import HomePage from './pages/HomePage.js'

import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends Component {
    render() {
        localStorage.removeItem('token')
        return (
            <Router>
                <div>
                    <div>
                        <NavBar />
                    </div>
                    <Route exact path="/" component={HomePage} />
                </div>
            </Router>
        );
    }
}

export default App;
