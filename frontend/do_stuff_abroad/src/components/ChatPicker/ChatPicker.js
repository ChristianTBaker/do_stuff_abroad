import React, { Component } from 'react'
import locations from '../../static/loactions.js'
import activities from '../../static/activities.js'
import Chat from './../Chat/Chat.js'

class ChatPicker extends Component {
    state = {
        continent: '',
        country: '',
        city: '',
        activity: '',
        show_chat: false
    }

    onChange = e => {
        let value = e.target.value
        if (value !== 'Please Select an Option' && value !== 'Please Select a Loaction') {
            this.setState({
                [e.target.name]: value
            })
        }
    }

    select_next = (object, key) => {
        var next_options = []
        let options = []
        if (object[key] && Array.isArray(object[key])) {
            object[key].forEach(element => {
                next_options.push(element)
            })
        } else {
            next_options = Object.keys(object[key])
        }
        next_options.unshift('Please Select a Loaction')
        next_options.forEach(element => {
            options.push(<option value={element}>{element.replace("_", " ")}</option>)
        })
        return options
    }

    send_selections = () => {
        this.setState({
            show_chat: true
        })
    }

    render() {
        var continents = []
        var continent_select = []
        var activity_select = []
        continents = Object.keys(locations)
        continents.unshift('Please Select a Loaction')
        continents.forEach(element => {
            continent_select.push(<option value={element}>{element.replace("_", " ")}</option>)
        });
        activities.forEach(element => {
            activity_select.push(<option value={element}>{element}</option>)
        })
        activity_select.unshift(<option value={'Please Select an Option'}>Please Select an Option</option>)
        const { continent, country, city, activity, show_chat } = this.state
        return (
            <div>
                <select name='continent' onChange={this.onChange}>
                    {continent_select}
                </select>
                {continent ?
                    <select name='country' onChange={this.onChange}>
                        {this.select_next(locations, continent)}
                    </select>
                    : null}
                {country ?
                    <select name='city' onChange={this.onChange}>
                        {this.select_next(locations[continent], country)}
                    </select>
                    : null}
                {city ?
                    <select name='activity' onChange={this.onChange}>
                        {activity_select}
                    </select>
                    : null}
                {activity ? <button onClick={this.send_selections}>Submit</button> : null}
                {show_chat ? <Chat username={this.props.username} city={city} activity={activity} /> : null}
            </div>
        )
    }

}

export default ChatPicker