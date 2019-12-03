import React from 'react'
import {Card} from 'react-bootstrap'
export default function SingleExperience(props) {
    let experience = props;
    console.log(experience);
    let { role, company, startDate, endDate, description, area } = experience.experience;
    return (

                <Card.Body>
                    <Card.Title>{role}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{company}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{startDate} - {endDate} (Add moment here)</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{area}</Card.Subtitle>
                    <Card.Text> {description}</Card.Text>
                </Card.Body>
    )
}