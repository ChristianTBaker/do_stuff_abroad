import React, { Component } from 'react'
import API from './../../api/api.js'
import EditForm from './../EditForm/EditForm.js'
import { thisExpression } from '@babel/types';

class Profile extends Component {
    state = {
        profile: {},
        show_edit_form: false,
        change_status: false
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


    show_edit_form = (e) => {
        e.preventDefault()
        this.setState({
            show_edit_form: true
        })
    }

    handle_status_change(status) {
        this.setState({
            change_status: !this.state.change_status
        })
    }

    set_new_profile() {
        const id = this.props.user_id;
        API.fetchProfileByID(id)
            .then((profile) => this.setState({
                profile: profile[0]
            }))
    }

    render() {
        const profile = this.state.profile
        return (
            <div>
                <h1>User ID: {this.props.user_id}</h1>
                {profile ? <p>{profile['status']}</p> : null}
                <button onClick={this.show_edit_form}>Edit Status</button>
                {this.state.show_edit_form ? <EditForm
                    profile={this.state.profile}
                    user_id={this.props.user_id}
                    handle_status_change={this.handle_status_change}
                    change_status={this.props.change_status}
                    set_new_profile={this.set_new_profile} /> : null}
            </div>
        )
    }
}

export default Profile