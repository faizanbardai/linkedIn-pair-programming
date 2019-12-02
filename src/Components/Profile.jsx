import RetrieveMyProfile from '../API/RetrieveMyProfile'
import React, { Component } from 'react'
import { Card, Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import UpdateProfile from '../API/UpdateProfile'

export default class Profile extends Component {
    state = {
        loading: true,
        profile: "",
        firstname: "",
        lastname: "",
        title: "",
        bio: "",
        location: "",
        setShow: false
    }


    handleClose() {
        this.setState({
            setShow: false
        })
    }
    handleOpen = () => {
        this.setState({
            setShow: true
        })
    }
    handleSubmit = async () => {
        let response = await UpdateProfile(
            {
                "name": this.state.firstname,
                "surname": this.state.lastname,
                "email": this.state.profile.email,
                "bio": this.state.bio,
                "title": this.state.title,
                "area": this.state.location,
                "image": ""
            }, this.state.profile._id);
        console.log(response);
    }

    render() {

        let { loading, profile, setShow, firstname, lastname, title, bio, location } = this.state;

        return (
            <>
                {loading && <h1>Loading...</h1>}

                {profile && <section>
                    <Card body>
                        <div >
                            {profile.name + " " + profile.surname}
                        </div>
                        <div >
                            {profile.title}
                        </div>
                        <div >
                            {profile.bio}
                        </div>
                        <div >
                            {profile.area}
                        </div>
                        <div onClick={() => this.handleOpen()}>
                            <FontAwesomeIcon icon={faEdit} />
                        </div>
                    </Card>
                    <Modal show={setShow} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit intro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>

                                <Form.Group controlId="LinkedInBasicProfile">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        placeholder="First name"
                                        value={firstname}
                                        onChange={(e) => this.setState({ firstname: e.target.value })}
                                    />
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        placeholder="Last name"
                                        value={lastname}
                                        onChange={(e) => this.setState({ lastname: e.target.value })}
                                    />
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => this.setState({ title: e.target.value })}
                                    />
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        placeholder="Location"
                                        value={location}
                                        onChange={(e) => this.setState({ location: e.target.value })}
                                    />
                                    <Form.Label>Biography</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Biography"
                                        value={bio}
                                        onChange={(e) => this.setState({ bio: e.target.value })}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => this.handleSubmit()}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </section>}
            </>
        )
    }
    componentDidMount = async () => {
        let response = await RetrieveMyProfile();
        this.setState({
            profile: response,
            firstname: response.name,
            lastname: response.surname,
            title: response.title,
            bio: response.bio,
            location: response.area,
            loading: false
        })
        console.log("Component did mount. Loading: ", this.state.loading);
    }
}
