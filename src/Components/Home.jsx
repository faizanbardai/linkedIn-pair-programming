import React, { Component } from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import Feed from './Feed';


export default class Home extends Component {
    render() {
        return (
            <div>
                <NavBar allUsers={allUsers} myProfileImg={myProfile.image} />
                <Feed allUsers={allUsers} username={username} password={password} />
                <Footer />
            </div>
        )
    }
}







