import React, { Component } from 'react';
import { Form, Button, Row, Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import GetAllPosts from '../API/GetAllPosts'
import AddPost from '../API/AddPost';
import SingleFeed from './SingleFeed';
import DeletePost from '../API/DeletePost';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import PostImage from '../API/PostImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default class Feed extends Component {
  state = {
    loading: true,
    posts: [],
    text: "",
    image: ""
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  handleImageSelection = async (e) => {
    let imageData = e.target.files[0];
    const formData = new FormData();
    formData.append('post', imageData);
    this.setState({ formData, image: e.target.value })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    let { text, formData } = this.state;
    let { username, password } = this.props;
    this.setState({ loading: true })
    let newPost = await AddPost({ "text": text }, username, password);
    let newPostWithImage;
    if (formData) { newPostWithImage = await PostImage(formData, newPost._id, username, password); }
    this.setState({
      posts: this.state.posts.concat(formData ? newPostWithImage : newPost),
      text: "",
      formData: "",
      image: "",
      loading: false
    })
  }
  deletePost = async (item) => {
    let response = await DeletePost(item, this.props.username, this.props.password);
    response === 200 && this.setState({ posts: this.state.posts.filter(post => post._id !== item) })
  }
  render() {

    let { posts, text, loading, image } = this.state;
    let { allUsers, username } = this.props;

    return (
      <Container>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              required
              value={text}
              placeholder="Write a new post."
              onChange={(e) => this.handleChange(e)}
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
                Submit
            </Button>
            </div>
          </Form.Group>
        </Form>


        {loading && <div className="d-flex justify-content-center my-5">
          <Loader type="Oval" color="green" height={80} width={80} />
        </div>}

        <Row>
          {
            posts.slice(0).reverse().map(post => (
              <SingleFeed
                key={post._id}
                editPost={this.editPost}
                deletePost={this.deletePost}
                username={username}
                post={post}
                user={allUsers.filter(user => user.username === post.username)[0]}
              />))
          }
        </Row>
      </Container>
    )
  }
  componentDidMount = async () => {
    let { username, password } = this.props;
    this.setState({
      posts: await GetAllPosts(username, password),
      loading: false
    })
  }
}