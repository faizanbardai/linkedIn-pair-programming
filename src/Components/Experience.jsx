import React, { Component } from 'react'
import { Card, Modal, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import SingleExperience from './SingleExperience';
import AddExperience from '../API/AddExperience';

export default class Experience extends Component {
    state = {
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
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = async () => {
        let {role, company, startDate, endDate, description, area, image} = this.state
        let response = await AddExperience(
            { role, company, startDate, endDate, description, area, image }, 
            this.props.profileID);
        this.props.addNewExperience(response);
        this.handleClose();
    }
    render() {
        let { setShow } = this.state;
        let { experiences, personal } = this.props;
        

        return (
            <>
                <Modal show={setShow} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="LinkedInBasicProfile">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    name="role"
                                    placeholder="Title"
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                    name="company"
                                    placeholder="Company"
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    placeholder="Start Date"
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    placeholder="End Date"
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    name="area"
                                    placeholder="Location"
                                    onChange={(e) => this.handleChange(e)}
                                />
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    name="description"
                                    placeholder="Description"
                                    onChange={(e) => this.handleChange(e)}
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
                <Card className="mb-2">
                    <Card.Header>
                        <div className="d-flex justify-content-between">
                            <div><h2>Experiences</h2></div>
                            {personal && <div
                                className="d-flex align-items-center"
                                onClick={() => this.handleOpen()}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </div>}
                        </div>
                    </Card.Header>
                    {experiences && experiences.map(experience => <SingleExperience key={experience._id} experience={experience}/>)}
                </Card>
            </>
        )
    }    
}
