import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RetrieveProfile from '../API/RetrieveProfile';
import '../Login.css';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { MainComponent } from './MainComponent';

export default class Login extends Component {
    state = {
        login: false,
        username: "user24",
        password: "48D4vaVh6Ra3DD8w"
    }
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (e) => {
        let {username, password} = this.state;
        e.preventDefault();
        this.testLogin(username, password);
    }
    testLogin = async (username, password) => {
        let response = await RetrieveProfile("me", username, password);
        response && this.setState({
            login: true,
            user: response
        })
    }
    render() {
        let { login, user, username, password } = this.state;
        return (
            <>
                <Router>
                    <Route path="/login" exact>
                        <Container className="Login">
                            <FontAwesomeIcon icon={faLinkedin} size="3x" style={{ color: "Blue" }} />
                            <h1 className="display-4">LinkedIn <br /> by FayJu & Tash</h1>
                            <Form className="Login-form" onSubmit={(e) => this.handleSubmit(e)}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        name="username"
                                        value="user24"
                                        placeholder="Enter username"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your username with anyone else except Tash.
                        </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control
                                        value="48D4vaVh6Ra3DD8w"
                                        name="password"
                                        type="password"
                                        placeholder="Enter password"
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Form.Group>
                                {login ?
                                    <Link to={"/home"}>
                                        <Button variant="outline-primary" block>
                                            Welcome {user.name} {user.surname}
                                        </Button>
                                    </Link>
                                    :
                                    <Button variant="outline-primary" block type="submit">
                                        Submit
                            </Button>
                                }
                            </Form>
                        </Container>
                    </Route>
                    <Route path="/home" exact render={
                        props=> <MainComponent username={username} password={password} myProfile={user}/>} />
                </Router>
            </>
        )
    }
}
