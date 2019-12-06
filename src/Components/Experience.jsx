import React, { Component } from 'react'
import { Card, Modal, Form, Button, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import SingleExperience from './SingleExperience';
import AddExperience from '../API/AddExperience';
import AddExperienceWithImage from '../API/AddExperienceWithImage';
import Loader from 'react-loader-spinner';

export default class Experience extends Component {
    state = {
        loading: false,
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
    handleImageSelection = async (e) => {
        let imageData = e.target.files[0];
        const formData = new FormData();
        formData.append('experience', imageData);
        this.setState({ formData, image: e.target.value })
    }
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let { role, company, startDate, endDate, description, area, formData } = this.state
        let { username, password } = this.props;
        this.handleClose();  
        this.setState({loading: true})
        let AddExpWithoutImage = await AddExperience(
            { role, company, startDate, endDate, description, area },
            username, password);
        let AddExpWithImage;
        if (AddExpWithoutImage && formData) { AddExpWithImage = await AddExperienceWithImage(formData, AddExpWithoutImage._id, username, password); }
        this.props.addNewExperience(formData? AddExpWithImage : AddExpWithoutImage);
        this.setState({
            role: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
            area: "",
            image: "",
            formData: "",
            loading: false
        })
           
    }
    deleteExperience = (item) => {
        this.props.deleteExperience(item)
    }
    render() {
        let { setShow, image, loading } = this.state;
        let { experiences, personal } = this.props;

        return (
            <>
                <Modal show={setShow} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Experience</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => this.handleSubmit(e)}>
                        <Form.Group>
                            <Modal.Body>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="role"
                                            placeholder="Title"
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Form.Label>Company</Form.Label>
                                        <Form.Control
                                            required
                                            name="company"
                                            placeholder="Company"
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            required
                                            type="date"
                                            name="startDate"
                                            placeholder="Start Date"
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="endDate"
                                            placeholder="End Date"
                                            onChange={(e) => this.handleChange(e)}
                                        />
                                    </Col>
                                </Row>
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    required
                                    name="area"
                                    placeholder="Location"
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <Form.Label>Image</Form.Label>
                                {/* <Form.Control
                                    name="image"
                                    placeholder="Location"
                                    onChange={(e) => this.handleChange(e)}
                                /> */}
                                <div className="d-flex justify-content-between">
                                    <Form.Control
                                        type="file"
                                        value={image}
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
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    required
                                    as="textarea" rows="3"
                                    name="description"
                                    placeholder="Description"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.handleClose()}>
                                    Close
                            </Button>
                                <Button variant="primary" type="submit">
                                    Save Changes
                            </Button>
                            </Modal.Footer>
                        </Form.Group>
                    </Form>
                </Modal>
                <Card className="mb-2">
                    <Card.Header>
                        <div className="d-flex justify-content-between">
                            <div><h2>Experiences</h2></div>
                            {personal && <div
                                className="d-flex align-items-center"
                                onClick={() => this.handleOpen()}
                            >
                                <Button variant="outline-info" className="rounded-circle"><FontAwesomeIcon icon={faPlus} /></Button>
                            </div>}
                        </div>
                    </Card.Header>
                    {loading && <div className="d-flex justify-content-center my-5">
                        <Loader type="Oval" color="green" height={80} width={80} />
                    </div>}
                    {experiences && experiences.map(experience =>
                        <SingleExperience
                            key={experience._id} experience={experience}
                            personal={personal} deleteExperience={this.deleteExperience}
                        />)
                    }
                </Card>
            </>
        )
    }
}
