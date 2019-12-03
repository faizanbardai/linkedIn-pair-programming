import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserFriends, faBriefcase, faCommentAlt, faBell } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'



export class NavBar extends Component {
    state = {
        searchKeyword: ""
    }
    searchUser = (e) => {
        e.preventDefault();
    }

    render() {
        let { searchKeyword } = this.state;
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                    <FontAwesomeIcon className="d-block mx-auto" icon={faLinkedin} />
                </Link>
                <form onSubmit={(e) => this.searchUser(e)} className="form-inline my-2 my-lg-0">
                    <input
                        value={searchKeyword}
                        onChange={(e) => this.setState({ searchKeyword: e.target.value })}
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <Link to={"/profile/" + searchKeyword}>
                        <button
                            className="btn btn-outline-success my-2 my-sm-0"
                            type="submit">
                            Search
                        </button>
                    </Link>

                </form>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">
                                <FontAwesomeIcon className="d-block mx-auto" icon={faHome} />
                                Home
                            <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/network">
                                <FontAwesomeIcon className="d-block mx-auto" icon={faUserFriends} />
                                My Network
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/jobs">
                                <FontAwesomeIcon className="d-block mx-auto" icon={faBriefcase} />
                                Jobs
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/messaging">
                                <FontAwesomeIcon className="d-block mx-auto" icon={faCommentAlt} />
                                Messaging
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/notifications">
                                <FontAwesomeIcon className="d-block mx-auto" icon={faBell} />
                                Notifications
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile/me">
                                {/* Insert Image here */}
                                Me
                        </Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </li> */}
                    </ul>
                </div>
            </nav>
        )
    }
}
