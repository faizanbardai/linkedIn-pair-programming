import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Login from './Login';
import { Home } from './Home';


export default class App extends Component {
    state = {
        isLoggedIn: false,
        username: "",
        password: ""
    }
    handleLoginSuccess = (username, password) => {
        this.setState({
            isLoggedIn: true,
            loginDialog: false,
            username: username,
            password: password
        })
    }
    render() {
        let { isLoggedIn, username, password } = this.state;
        return (
            <Router>
                <Switch>
                    {isLoggedIn ?
                        <Route path="/" exact render={(props) =>
                            <Login handleLoginSuccess={() => this.handleLoginSuccess} />} />
                        :
                        <Route path="/home" exact render={(props) =>
                            <Home username={username} password={password} />} />
                    }
                </Switch>
            </Router>
        )
    }
}
