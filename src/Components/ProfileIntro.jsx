import React, { Component } from 'react';
import { Card, Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import UpdateProfile from '../API/UpdateProfile';
import PostProfileImage from '../API/PostProfileImage';

export default class ProfileIntro extends Component {
    state = {
        setShow: false, // for modal
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
    handleImageSelection = async (e) => {
        let imageData = e.target.files[0];
        const formData = new FormData();
        formData.append('profile', imageData);
        this.setState({ formData })
    }
    handleSubmit = async () => {
        let { name, surname, bio, title, area, formData } = this.state;
        let { username, password } = this.props;
        await UpdateProfile(
            {
                name, surname, title, bio, area
            }, this.props.profile._id, username, password);
        let profileWithImage = await PostProfileImage(formData, username, password);
        this.props.updateProfile(profileWithImage);
        this.setState({
            setShow: false,
        })

    }
    render() {
        let { profile, personal } = this.props;
        let { setShow, name, surname, title, bio, area, image } = this.state;
        return (
            <>
                <Card className="mb-2">
                    <div
                        className="profile-background-image profile-background-image--loading">
                    </div>
                    <Card body>
                        <Image alt="profile" src={profile.image} roundedCircle thumbnail></Image>
                        <div className="d-flex justify-content-between">
                            <div>
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
                            </div>
                            <div>
                                {personal &&
                                    <Button
                                        variant="outline-primary"
                                        className="rounded-circle"
                                        onClick={() =>
                                            this.handleOpen()}
                                    >
                                        <FontAwesomeIcon icon={faPencilAlt} /></Button>}
                            </div>
                        </div>
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
                                            value={name}
                                            onChange={(e) => this.setState({ name: e.target.value })}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            placeholder="Last name"
                                            value={surname}
                                            onChange={(e) => this.setState({ surname: e.target.value })}
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
                                            value={area}
                                            onChange={(e) => this.setState({ area: e.target.value })}
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
                                        {/* IceCream: Do we want to show image */}
                                        {/* <Image
                                            alt="profile"
                                            style={{width: "200px"}}
                                            src={image}
                                            thumbnail>
                                        </Image> */}
                                        <Form.Label>Update Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => this.handleImageSelection(e)}
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
            </>
        )
    }
    componentDidMount() {
        let { profile } = this.props;
        this.setState({
            name: profile.name,
            surname: profile.surname,
            title: profile.title,
            bio: profile.bio,
            area: profile.area,
            image: profile.image,
        })
    }

}
