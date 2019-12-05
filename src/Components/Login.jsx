import React, { Component } from 'react';
import RetrieveProfile from '../API/RetrieveProfile';
import '../Login.css';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import GetAllUsers from '../API/GetAllUsers';

export default class Login extends Component {
    state = {
        displayLogin: true,
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
        let { username, password } = this.state;
        e.preventDefault();
        this.testLogin(username, password);
    }
    testLogin = async (username, password) => {
        let myProfile = await RetrieveProfile("me", username, password);
        if(myProfile) {
            let allUsers= await GetAllUsers(username, password)
            this.props.handleLoginSuccess(username, password, myProfile, allUsers)            
        }
        
        this.setState({
            login: true,
            myProfile: response
        })
    }
    render() {
        let { login, myProfile, username, password } = this.state;
        return (
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
                        // <Link onClick={() => this.setState({ displayLogin: false })} to={"/home"}>
                        <Link to={"/home"}>
                            <Button variant="outline-primary" block>
                                Welcome {myProfile.name} {myProfile.surname}
                            </Button>
                        </Link>
                        :
                        <Button variant="outline-primary" block type="submit">
                            Submit
                        </Button>
                    }
                </Form>
            </Container>
        )
    }
}
