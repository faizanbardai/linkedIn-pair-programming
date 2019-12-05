import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';
import Profile from './Profile';
import { NavBar } from './NavBar';
import { Container } from 'react-bootstrap';
import Feed from './Feed';
import Home from './Home';


export default class App extends Component {
    state = {
        isLoggedIn: false,
        username: "",
        password: ""
    }
    handleLoginSuccess = (username, password, myProfile, allUsers) => {
        this.setState({
            isLoggedIn: true,
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
                    <Switch>
                        <Route path="/" exact render={props => <Login handleLoginSuccess={this.handleLoginSuccess} />} />
                        <Route path="/" exact render={props => <Home allUsers={allUsers} username={username} password={password} />} />                        
                        <Route path="/profile/:username" render={props =><Profile username={username}password={password} />} />
                    </Switch>
                </Router>
            </Container>
        )
    }
}
