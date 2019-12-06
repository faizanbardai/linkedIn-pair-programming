import React, { Component } from 'react'
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner'
import AddPost from '../API/AddPost';
import PostImage from '../API/PostImage';
export default class PostForm extends Component {
    state = {
        loadingNewPost: false,
        text: "",
        image: ""
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let { text, formData } = this.state;
        let { username, password } = this.props;
        this.setState({ loadingNewPost: true })
        let newPost = await AddPost({ "text": text }, username, password);
        let newPostWithImage;
        if (formData) { newPostWithImage = await PostImage(formData, newPost._id, username, password); }
        this.props.updatePosts(formData ? newPostWithImage : newPost);
        this.setState({
            text: "",
            formData: "",
            image: "",
            loadingNewPost: false
        })
    }
    handleImageSelection = async (e) => {
        let imageData = e.target.files[0];
        const formData = new FormData();
        formData.append('post', imageData);
        this.setState({ formData, image: e.target.value })
    }
    render() {
        let { loadingNewPost, text, image } = this.state;
        return (
            <Form onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Group>
                    <Form.Control
                        required
                        value={text}
                        placeholder="Write a new post."
                        onChange={(e) => this.setState({ text: e.target.value })}
                        as="textarea"
                        rows="3"
                    />
                    <div className="d-flex justify-content-between my-2">
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
                        <Button className="float-right mb-2" variant="outline-primary" type="submit">
                            <div className="d-flex justify-content-around">
                                Submit
                                {loadingNewPost && <Loader className="mx-2" type="Oval" color="green" height={20} width={20} />}
                            </div>
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        )
    }
}
