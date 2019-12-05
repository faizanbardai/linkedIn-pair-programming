import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Profile from './Profile'
import { Footer } from './Footer';
import Feed from './Feed';

export class Home extends Component {
    state = {}
    render() {
        let { allUsers } = this.state;
        let { myProfile, username, password } = this.props;

        return (
            <Container fluid className="px-0">
                <Router>
                    <Container className="my-2">
                        <Switch>
                            <Route
                                path="/profile/:username"
                                render={props =>
                                    <Profile
                                        username={username}
                                        password={password}
                                    />
                                }
                            >
                            </Route>
                            <Route
                                path="/home"
                                exact
                                render={props => <Feed
                                    allUsers={allUsers}
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
}    
