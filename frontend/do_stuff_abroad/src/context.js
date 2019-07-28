import React, { Component } from 'react'

const Context = React.createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR_USERNAME':
            return {
                ...state,
                username: ''
            }
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            }
        default:
            return state
    }
}

export class Provider extends Component {
    state = {
        username: '',
        dispatch: action => this.setState(state => reducer(state, action))
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer

