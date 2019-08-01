import React, { Component } from 'react'
import API from './../../api/api.js'

class EditForm extends Component {

    onSubmit = (e) => {
        e.preventDefault()
        const new_status = e.target.elements[0]
        API.updateStatus(this.props.profile['id'], new_status, this.props.user_id)
            .then(() => {
                this.props.handle_status_change(e.target.value)
            })
    }

    componentWillReceiveProps() {
        this.props.set_new_profile()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input placeholder='10 characters max' type='text' />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default EditForm
