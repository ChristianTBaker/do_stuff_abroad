import React, { Component } from 'react'
import LoginPage from './pages/LoginPage.js'
import './App.css'

import { Provider } from './context'

class App extends Component {
    render() {
        return (
            <Provider>
                <LoginPage />
            </Provider>
        );
    }
}

export default App;
