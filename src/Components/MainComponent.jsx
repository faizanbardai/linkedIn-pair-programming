import React from 'react';
import { BrowserRouter as Router, Switch ,Route } from "react-router-dom";
import  Profile  from './Profile'
import { NavBar } from './NavBar';
import { Footer } from './Footer';

export const MainComponent = () => {
    return (
        <section className="container-fluid">
        <NavBar />
        
        <Router>
            <Switch>
                <Route path="/profiles/me" component={Profile}></Route>
            </Switch>
        </Router>
        <Footer />
        </section>
    )
}
