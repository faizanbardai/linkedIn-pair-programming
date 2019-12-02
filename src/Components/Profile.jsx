import RetrieveMyProfile from '../API/RetrieveMyProfile'
import React, { Component } from 'react'
import { Card, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default class Profile extends Component {
    state = {
        loading: true,
        profile: "",
        setShow: false
    }


    handleClose() {
        console.log("I'll close the modal");
        this.setState({
            setShow: false
        })    
    }
    handleOpen = () => {
        console.log("I'll open the modal");
        this.setState({
            setShow: true
        })
    }

    render() {

        let { loading, profile, setShow } = this.state;

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
                        <div onClick={() => this.handleOpen()}>
                            <FontAwesomeIcon icon={faEdit} />
                        </div>
                    </Card>
                    <Modal show={setShow} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit intro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Show API data here.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => this.handleClose()}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
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
        console.log("Component did mount. Loading: ", this.state.loading);
    }


}
