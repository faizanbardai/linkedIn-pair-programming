import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import Feed from './Feed';
import Profile from './Profile';

export default class Home extends Component {
    render() {
        let { allUsers, myProfile, username, password } = this.props;
        return (
            <>
                <Router>
                    <NavBar allUsers={allUsers} myProfileImg={myProfile.image} />
                    <Switch>
                        <Route path="/" exact render={props => <Feed allUsers={allUsers} username={username} password={password} />} />
                        <Route path="/profile/:username" render={props => <Profile username={username} password={password} />} />
                    </Switch>
                </Router>
                <Footer />
            </>
        )
    }
}







