import React, { Component } from 'react';
import Login from './Login';
import Home from './Home';
import { Container } from 'react-bootstrap';


export default class App extends Component {
    state = {
        isLoggedIn: false,
    }
    handleLoginSuccess = (username, password, myProfile, allUsers) => {
        this.setState({
            username: username,
            password: password,
            myProfile: myProfile,
            allUsers: allUsers,
            isLoggedIn: true
        })
    }
    render() {
        let { username, password, isLoggedIn, myProfile, allUsers } = this.state;
        return (
            <Container fluid className="px-0">
                {isLoggedIn ?
                    <Home myProfile={myProfile} allUsers={allUsers} username={username} password={password} />
                    :
                    <Login handleLoginSuccess={this.handleLoginSuccess} />
                }
            </Container >
        )
    }
}
