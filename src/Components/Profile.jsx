import RetrieveProfile from '../API/RetrieveProfile'
import React, { Component } from 'react'
import { Card, Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import UpdateProfile from '../API/UpdateProfile'
import GetExperience from '../API/GetExperience'
import Experience from './Experience';

export default class Profile extends Component {
    state = {
        loading: true,
        profile: "",
        firstname: "",
        lastname: "",
        title: "",
        bio: "",
        location: "",
        image: "",
        setShow: false, // for modal
        personal: "" // show "edit profile" button only on personal profile page
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
        let { name, surname, email, bio, title, area } = this.state;
        let profile = await UpdateProfile(
            {
                name, surname, email, bio, title, area
            }, this.state.profile._id);
        this.setState({
            setShow: false,
            profile: profile
        })
        console.log(profile);
    }

    render() {

        let { loading, profile, setShow, firstname, lastname, title, bio, location, experiences, personal } = this.state;

        return (
            <>
                {loading && <h1>Loading...</h1>}

                {profile && <section>
                    <Card className="mb-2">
                        <div
                            className="profile-background-image profile-background-image--loading">
                        </div>
                        <Card body>
                            <Image alt="profile" src={profile.image} roundedCircle thumbnail></Image>
                            <Row>
                                <Col sm={9}>
                                    <div className="t-14 t-black t-normal">
                                        {profile.name + " " + profile.surname}
                                    </div>
                                    <div className="t-12 t-black t-normal" >
                                        {profile.title}
                                    </div>
                                    <div >
                                        {profile.bio}
                                    </div>
                                    <div >
                                        {profile.area}
                                    </div>
                                </Col>
                                <Col sm={3}>
                                    {personal && <Button onClick={() => this.handleOpen()} variant="primary"><FontAwesomeIcon icon={faEdit} />  Edit Profile</Button>}
                                </Col>
                            </Row>
                        </Card>
                    </Card>
                    <Modal show={setShow} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit intro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="LinkedInBasicProfile">
                                    <Row className="mb-2">
                                        <Col>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                placeholder="First name"
                                                value={firstname}
                                                onChange={(e) => this.setState({ firstname: e.target.value })}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                placeholder="Last name"
                                                value={lastname}
                                                onChange={(e) => this.setState({ lastname: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col>
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                placeholder="Title"
                                                value={title}
                                                onChange={(e) => this.setState({ title: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col>
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control
                                                placeholder="Location"
                                                value={location}
                                                onChange={(e) => this.setState({ location: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col>
                                            <Form.Label>Biography</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Biography"
                                                value={bio}
                                                onChange={(e) => this.setState({ bio: e.target.value })}
                                            />
                                        </Col>
                                    </Row>
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
                    <Experience experiences={experiences} />
                </section>}
            </>
        )
    }
    componentDidMount = async () => {
        let user = this.props.match.params.username;
        user==="me"? this.setState({personal: true}):this.setState({personal: false})
        let profile = await RetrieveProfile(user);
        let experiences = await GetExperience(profile.username);
        this.setState({
            profile: profile,
            experiences: experiences,
            firstname: profile.name,
            lastname: profile.surname,
            title: profile.title,
            bio: profile.bio,
            location: profile.area,
            image: profile.image,
            loading: false
        })
    }
    componentDidUpdate = async (prevProps) => {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            let user = this.props.match.params.username;
            user==="me"? this.setState({personal: true}):this.setState({personal: false})
            let profile = await RetrieveProfile(user);
            let experiences = await GetExperience(profile.username);
            this.setState({
                profile: profile,
                experiences: experiences,
                firstname: profile.name,
                lastname: profile.surname,
                title: profile.title,
                bio: profile.bio,
                location: profile.area,
                image: profile.image,
                loading: false
            })
        }
    }

}
