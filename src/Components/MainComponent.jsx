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
        let { myProfile } = this.props;

        return (
            <Container fluid className="px-0">
                <Router>
                    {myProfile && <NavBar allUsers={allUsers} myProfile={myProfile} />}
                    <Container className="my-2">
                        <Switch>
                            <Route
                                path="/profile/:username"
                                component={Profile}>
                            </Route>
                            <Route
                                path="/home"
                                exact
                                render={props => <Feed allUsers={allUsers} myProfile={myProfile}/>}>
                            </Route>
                        </Switch>
                    </Container>
                    <Footer />
                </Router>
            </Container>
        )
    }
    componentDidMount = async () => {
        this.setState({
            // myProfile: await RetrieveProfile("me"),            
            allUsers: await GetAllUsers()
        })
    }
}    
