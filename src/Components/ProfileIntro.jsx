import React, { Component } from 'react';
import { Card, Modal, Button, Form, Image, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import UpdateProfile from '../API/UpdateProfile';
import PostProfileImage from '../API/PostProfileImage';
import Loader from 'react-loader-spinner';

export default class ProfileIntro extends Component {
    state = {
        loading: false,
        setShow: false, // for modal
    }
    handleClose() {
        this.setState({
            setShow: false,
            formData: "",
            image: ""
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
        this.setState({ formData, image: e.target.value })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let { name, surname, bio, title, area, formData } = this.state;
        let { username, password } = this.props;
        this.setState({ loading: true })
        let profileWithoutImage = await UpdateProfile(
            {
                name, surname, title, bio, area
            }, this.props.profile._id, username, password);
        let profileWithImage;
        if (formData) { profileWithImage = await PostProfileImage(formData, username, password); }
        this.props.updateProfile(formData ? profileWithImage : profileWithoutImage);
        this.setState({
            setShow: false,
            loading: false,
            formData: "",
            image: ""
        })

    }
    render() {
        let { profile, personal } = this.props;
        let { loading, setShow, name, surname, title, bio, area, image } = this.state;
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
                                        onClick={() => this.handleOpen()}>
                                        <FontAwesomeIcon icon={faPencilAlt} /></Button>}
                            </div>
                        </div>
                    </Card>
                </Card>
                <Modal show={setShow} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit intro</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => this.handleSubmit(e)}>
                        <Form.Group controlId="LinkedInBasicProfile">
                            <Modal.Body>
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
                                        <div className="d-flex justify-content-start">
                                            <Form.Control
                                                value={image}
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                onChange={(e) => this.handleImageSelection(e)}
                                            />
                                            {image &&
                                                <OverlayTrigger
                                                    placement={"top"}
                                                    overlay={
                                                        <Tooltip id={`tooltip-${"top"}`}>
                                                            Remove Image
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Button
                                                        onClick={() => this.setState({ formData: "", image: "" })}
                                                        className="mb-2 mr-2" variant="outline-primary">
                                                        <FontAwesomeIcon icon={faTimesCircle} />
                                                    </Button>
                                                </OverlayTrigger>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.handleClose()}>
                                    Close
                            </Button>
                                <Button variant="primary" type="submit">
                                    <div className="d-flex justify-content-around">
                                        Save Changes
                                {loading && <Loader className="mx-2" type="Oval" color="white" height={20} width={20} />}
                                    </div>
                                </Button>
                            </Modal.Footer>
                        </Form.Group>
                    </Form>
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
        })
    }

}
