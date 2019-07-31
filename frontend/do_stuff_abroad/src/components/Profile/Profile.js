import React, { Component } from 'react'
import API from './../../api/api.js'

class Profile extends Component {
    state = {
        profile: {}
    }

    componentDidMount() {
        const id = this.props.user_id;
        API.fetchProfileByID(id)
            .then((profile) => this.setState({
                profile: profile[0]
            }))
            .then(() => {
                if (!this.state.profile) {
                    API.postDefaultProfile(id)
                        .then(() => {
                            API.fetchProfileByID(id)
                                .then((profile) => this.setState({
                                    profile: profile[0]
                                }))
                        })
                }
            })
    }

    render() {
        const profile = this.state.profile
        return (
            <div>
                <h1>Username: {this.props.username}</h1>
                {profile ? <p>{profile['city']}</p> : null}
                {profile ? <p>{profile['activity']}</p> : null}
                {profile ? <p>{profile['status']}</p> : null}
            </div>
        )
    }
}

export default Profile