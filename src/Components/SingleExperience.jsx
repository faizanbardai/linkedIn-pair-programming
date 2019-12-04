import React from 'react'
import { Card } from 'react-bootstrap'
import Moment from 'react-moment';
export default function SingleExperience(props) {
    let experience = props;
    let { role, company, startDate, endDate, description, area } = experience.experience;
    return (
        <Card.Body>
            <Card.Title>{role}</Card.Title>
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