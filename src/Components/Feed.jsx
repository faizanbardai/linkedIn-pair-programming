import React, { Component } from 'react';
import { Row, Container } from 'react-bootstrap'
import GetAllPosts from '../API/GetAllPosts'
import SingleFeed from './SingleFeed';
import DeletePost from '../API/DeletePost';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import PostForm from './PostForm';

export default class Feed extends Component {
  state = {
    loadingPosts: true,
    posts: []
  }


  deletePost = async (item) => {
    let response = await DeletePost(item, this.props.username, this.props.password);
    response === 200 && this.setState({ posts: this.state.posts.filter(post => post._id !== item) })
  }
  updatePosts = (newPost) => {
    this.setState({posts: this.state.posts.concat(newPost)})
  }
  render() {

    let { posts, loadingPosts } = this.state;
    let { allUsers, username, password } = this.props;

    return (
      <Container>
        <PostForm username={username} password={password} updatePosts={this.updatePosts} />      
        {loadingPosts? <div className="d-flex justify-content-center my-5">
          <Loader type="ThreeDots" color="blue" height={80} width={80} />
        </div>
        :
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
        }
      </Container>
    )
  }
  componentDidMount = async () => {
    let { username, password } = this.props;
    this.setState({
      posts: await GetAllPosts(username, password),
      loadingPosts: false
    })
  }
}