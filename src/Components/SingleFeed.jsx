import React, { Component } from 'react';
import Moment from 'react-moment';
import { Card, Image, Button, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export default class SingleFeed extends Component {
    handleDelete = (action, item) => {
        action === "edit" ? this.props.editPost(item) : this.props.deletePost(item)
    }
    render() {
        let { post, user, username } = this.props;
        return (
            <Col md={6}>
            <Card border="primary" className="mb-2">
                <Card.Header>
                    <div className="d-flex justify-content-between">
                        {user.title} | {user.area}
                        <div>
                            <Image
                                style={{ height: "35px", width: "35px" }}
                                src={user.image}
                                roundedCircle
                            />
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <div className="d-flex justify-content-between">
                            <div>{user.name} {user.surname}</div>
                            {username === user.username && <div>
                                <Button onClick={() => this.handleDelete("delete", post._id)} variant="outline-info" className="rounded-circle mx-2"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                <Button onClick={() => this.handleDelete("edit", post._id)} variant="outline-info" className="rounded-circle mx-2"><FontAwesomeIcon icon={faPencilAlt} /></Button>
                            </div>}
                        </div>
                    </Card.Title>
                    <Card.Text>
                        {post.text}
                    </Card.Text>
                    <footer>
                        -<Moment fromNow>{post.updatedAt}</Moment>
                    </footer>
                </Card.Body>
            </Card>
            </Col>
        )
    }
}
