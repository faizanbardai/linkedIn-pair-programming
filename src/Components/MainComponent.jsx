import React, { Component } from 'react'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Profile from './Profile'
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import Feed from './Feed';
import GetAllUsers from '../API/GetAllUsers';

export class MainComponent extends Component {
    state = {}
    render() {
        let { allUsers } = this.state;
        let { myProfile, username, password } = this.props;

        return (
            <Container fluid className="px-0">
                <Router>
                    {myProfile && <NavBar allUsers={allUsers} myProfileImg={myProfile.image} />}
                    <Container className="my-2">
                        <Switch>
                            <Route path="/profile/:username" component={Profile} />
                            {/* <Route
                                path="/profile/:username"
                                render={props =>
                                    <Profile
                                        username={username}
                                        password={password}
                                    />
                                }
                            >
                            </Route> */}
                            <Route
                                path="/home"
                                exact
                                render={props => <Feed
                                    allUsers={allUsers}
                                    // myProfile={myProfile}
                                    username={username}
                                    password={password}
                                />}>
                            </Route>
                        </Switch>
                    </Container>
                    <Footer />
                </Router>
            </Container>
        )
    }
    componentDidMount = async () => {
        let { username, password } = this.props;
        this.setState({
            allUsers: await GetAllUsers(username, password)
        })
    }
}    
