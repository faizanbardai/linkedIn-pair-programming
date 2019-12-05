import React, { Component } from 'react'

import { Card, Button } from 'react-bootstrap'
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
export default class SingleExperience extends Component {
    handleClick(action, item) {
        action === "edit" ? this.props.editExperience(item) : this.props.deleteExperience(item)
    }

    render() {
        let { experience, personal } = this.props;
        let { role, company, startDate, endDate, description, area, _id } = experience;
        return (
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Card.Title>{role}</Card.Title>
                    {personal && <div>
                        <Button onClick={() => this.handleClick("delete", _id)} variant="outline-info" className="rounded-circle mx-2"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                        <Button onClick={() => this.handleClick("edit", _id)} variant="outline-info" className="rounded-circle mx-2"><FontAwesomeIcon icon={faPencilAlt} /></Button>
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
        )
    }
}