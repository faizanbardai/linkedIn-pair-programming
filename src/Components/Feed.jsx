import React, { Component } from 'react';
import { Form, Button, Row, Container } from 'react-bootstrap'
import GetAllPosts from '../API/GetAllPosts'
import AddPost from '../API/AddPost';
import SingleFeed from './SingleFeed';
import DeletePost from '../API/DeletePost';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export default class Feed extends Component {
  state = {
    loading: true,
    posts: [],
    text: ""
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    let { text } = this.state;
    let { username, password } = this.props;
    let newPost = await AddPost({
      "text": text
    }, username, password);
    this.setState({
      posts: this.state.posts.concat(newPost)
    })
    this.setState({ text: "" })
  }
  deletePost = async (item) => {
    let response = await DeletePost(item, this.props.username, this.props.password);
    response === 200 && this.setState({ posts: this.state.posts.filter(post => post._id !== item) })
  }
  render() {

    let { posts, text, loading } = this.state;
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
          </Form.Group>
          <Button className="mb-2" variant="outline-primary" type="submit">
            Submit
          </Button>
        </Form>


        {loading && <div className="d-flex justify-content-center">
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