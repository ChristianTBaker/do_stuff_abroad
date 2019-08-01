import React, { Component } from 'react'
import API from './../../api/api'

class Weather extends Component {

    state = {
        description: '',
        temperature: 0
    }

    componentDidMount() {
        API.get_city_weather(this.props.city)
            .then((response) => {
                this.setState({
                    description: response['weather'][0]['description'],
                    temperature: response['main']['temp']
                })
            })
    }

    render() {
        return (
            <div>
                <h4>{this.state.description}</h4>
                <h4>Temp: {this.state.temperature} C</h4>
            </div>
        )
    }
}

export default Weather