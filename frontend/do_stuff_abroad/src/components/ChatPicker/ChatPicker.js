import React, { Component } from 'react'
import locations from '../../static/loactions.js'
import activities from '../../static/activities.js'
import { send_city_and_activity } from './../../api/api.js'

class ChatPicker extends Component {
    state = {
        continent: '',
        country: '',
        city: '',
        activity: '',
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
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
        send_city_and_activity(this.state.city, this.state.activity, this.props.username)
    }

    render() {
        var continents = []
        var continent_select = []
        var activity_select = ['Please Select an Activity']
        continents = Object.keys(locations)
        continents.unshift('Please Select a Loaction')
        continents.forEach(element => {
            continent_select.push(<option value={element}>{element.replace("_", " ")}</option>)
        });
        activities.forEach(element => {
            activity_select.push(<option value={element}>{element}</option>)
        })
        return (
            <div>
                <select name='continent' onChange={this.onChange}>
                    {continent_select}
                </select>
                {this.state.continent ?
                    <select name='country' onChange={this.onChange}>
                        {this.select_next(locations, this.state.continent)}
                    </select>
                    : null}
                {this.state.country ?
                    <select name='city' onChange={this.onChange}>
                        {this.select_next(locations[this.state.continent], this.state.country)}
                    </select>
                    : null}
                {this.state.city ?
                    <select name='activity' onChange={this.onChange}>
                        {activity_select}
                    </select>
                    : null}
                {this.state.activity ? <button onClick={this.send_selections}>Submit</button> : null}
            </div>
        )
    }

}

export default ChatPicker