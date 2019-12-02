import RetrieveMyProfile from '../API/RetrieveMyProfile'
import React, { Component } from 'react'

export default class Profile extends Component {
    state = {
        profile: ""
    }
    render() {
        return (
            <div>
                Hi, I'm profile class component.
            </div>
        )
    }
    componentDidMount= async () => {
        let response = await RetrieveMyProfile();
        this.setState({
            profile: response
        })
    }
}
