import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Profile from './Profile'
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export const MainComponent = () => {
    return (
        <section className="container-fluid">
            <Router>
                <NavBar />
                <Container>
                        <Switch>
                            <Route path="/profile/me" component={Profile}></Route>
                        </Switch>
                </Container>
                <Footer />
            </Router>
        </section>
    )
}
