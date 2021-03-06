import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faBriefcase, faCommentAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Image, ListGroup } from 'react-bootstrap';

export class NavBar extends Component {
    state = {
        searchKeyword:""
    }

    filterUsers(e) {
        let searchKeyword = e.target.value;
        this.setState({ searchKeyword: searchKeyword })
        if (searchKeyword.length === 0) {
            this.setState({
                filteredUsers: [],
                user: ""
            })
        }
        if (searchKeyword && searchKeyword.length > 0) {
            let filteredUsers = this.props.allUsers
                .filter(user =>
                    user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    user.surname.toLowerCase().includes(searchKeyword.toLowerCase())
                )
            if (filteredUsers && filteredUsers.length > 0) {
                this.setState({
                    filteredUsers: filteredUsers,
                    user: filteredUsers[0].username
                })
            }
        }
    }

    render() {
        let { searchKeyword, user, filteredUsers } = this.state;
        return (
            <>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark py-0 mb-2">
                    <Link className="navbar-brand" to="/">
                        <FontAwesomeIcon className="d-block mx-auto" icon={faLinkedin} />
                    </Link>
                    <form onSubmit={(e) => { e.preventDefault(); }} className="form-inline my-1">
                        <input
                            value={searchKeyword}
                            onChange={(e) => this.filterUsers(e)}
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <Link to={"/profile/" + user}>
                            <button
                                className="d-none btn btn-outline-success my-2 my-sm-0"
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
                                    <Image
                                        className="d-block mx-auto"
                                        style={{ height: "30px" }}
                                        src={this.props.myProfileImg}
                                        roundedCircle
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <ListGroup id="search-autocomplete">
                    {filteredUsers && filteredUsers.map(user =>
                        <Link key={user._id} to={"/profile/" + user.username}>
                            <ListGroup.Item action>
                                <div className="d-flex justify-content-between">
                                    {user.name} {user.surname} &nbsp;
                                    <Image
                                        style={{ height: "30px", width: "30px" }}
                                        src={user.image ? user.image : "https://via.placeholder.com/30"}
                                        roundedCircle
                                    />
                                </div>
                            </ListGroup.Item>
                        </Link>
                    )}
                </ListGroup>
            </>
        )
    }
}