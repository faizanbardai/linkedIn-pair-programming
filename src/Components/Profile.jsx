import RetrieveMyProfile from '../API/RetrieveMyProfile'
import React, { Component } from 'react'
import { Card, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit  } from '@fortawesome/free-solid-svg-icons'

export default class Profile extends Component {
    state = {
        loading: true,
        profile: ""
    }
    render() {
        let { profile, loading } = this.state;
        
        return (
            <>
                {loading && <h1>Loading...</h1>}
                
                {profile && <section>
                    <Card body>
                        <div >
                            {profile.name + " " + profile.surname}
                        </div>
                        <div >
                            {profile.title}
                        </div>
                        <div >
                            {profile.bio}
                        </div>
                        <div >
                            {profile.area}
                        </div>
                        <div >
                            <FontAwesomeIcon icon={ faEdit } />
                        </div>
                    </Card>
                    {/* <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal> */}
                </section>}
            </>
            
        )
        
    }
    componentDidMount = async () => {
        let response = await RetrieveMyProfile();
        this.setState({
            profile: response,
            loading: false
        })
    }
}
