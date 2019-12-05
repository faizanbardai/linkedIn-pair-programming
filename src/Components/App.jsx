import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';
import { Home } from './Home';
import { Container, Navbar } from 'react-bootstrap';


export default class App extends Component {
    state = {
        isLoggedIn: false,
        username: "",
        password: ""
    }
    handleLoginSuccess = (username, password, myProfile, allUsers) => {
        this.setState({
            username: username,
            password: password,
            myProfile: myProfile,
            allUsers: allUsers
        })
    }
    render() {
        let { username, password, isLoggedIn, myProfile, allUsers } = this.state;
        return (
            <Container fluid>
                <Router>
                    {isLoggedIn && <Navbar allUsers={allUsers} myProfileImg={myProfile.image} />}
                    <Switch>
                        <Route path="/" exact render={props => <Login test="test" handleLoginSuccess={this.handleLoginSuccess} />} />
                        <Route path="/home" exact render={props => <Home username={username} password={password} myProfile={myProfile} />} />
                    </Switch>
                </Router>
            </Container>
        )
    }
}
