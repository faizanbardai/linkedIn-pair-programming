import React, { Component } from 'react'

import { Card, Button, Col, Image, Row } from 'react-bootstrap'
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
export default class SingleExperience extends Component {
    handleClick(action, item) {
        action === "edit" ? this.props.editExperience(item) : this.props.deleteExperience(item)
    }

    render() {
        let { experience, personal } = this.props;
        let { role, company, startDate, endDate, description, image, area, _id } = experience;
        return (
            <Row>
                <Col sm={12} md={4}><Image className="mb-2 mx-2" style={{ width: "100%" }} src={image} rounded /></Col>
                <Col sm={12} md={8}>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <Card.Title>{role}</Card.Title>
                            {personal && <div>
                                <Button onClick={() => this.handleClick("delete", _id)} variant="outline-info" className="rounded-circle mx-2 my-2"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                <Button onClick={() => this.handleClick("edit", _id)} variant="outline-info" className="rounded-circle mx-2 my-2"><FontAwesomeIcon icon={faPencilAlt} /></Button>
                            </div>}
                        </div>
                        <Card.Subtitle className="mb-2 text-muted">{company}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">
                            <Moment format="MMM YYYY">{startDate}</Moment>&nbsp;-&nbsp;
                            <Moment format="MMM YYYY">{endDate}</Moment><br />
                            <Moment
                                duration={startDate}
                                date={endDate}
                            />
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{area}</Card.Subtitle>
                        <Card.Text> {description}</Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        )
    }
}