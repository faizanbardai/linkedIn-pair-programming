import React, { Component } from 'react'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Profile from './Profile'
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import RetrieveProfile from '../API/RetrieveProfile';
import Feed from './Feed';



export class MainComponent extends Component {
    state = {}
    render() {
        
        return (
            <Container fluid className="px-0">
                <Router>
                    {this.state.myProfile && <NavBar myProfile={this.state.myProfile}/>}
                    <Container className="my-2">
                        <Switch>
                            <Route path="/profile/:username" component={Profile}></Route>
                            <Route path="/" exact component={Feed}></Route>

                        </Switch>
                    </Container>
                    <Footer />
                </Router>
            </Container>
        )
    }
    componentDidMount = async () => {
    this.setState({myProfile: await RetrieveProfile("me")})
    }
}    
