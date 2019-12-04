import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import { Form, Button, Card, Image } from 'react-bootstrap'
import GetAllPosts from '../API/GetAllPosts'
import GetAllUsers from '../API/GetAllUsers'
import AddPost from '../API/AddPost';
export default class Feed extends Component {

  state = {
    posts: []
  }
  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    let {text} = this.state;
    let newPost = await AddPost({
      "text": text
    });
    console.log(newPost);
  }
  render() {

    let { allUserPosts } = this.state

    return (
      <>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              name="text"
              onChange={(e) => this.handleChange(e)}
              as="textarea"
              rows="3"
            />
          </Form.Group>
          <Button className="mb-2" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {allUserPosts && allUserPosts.map(post =>
          <Card key={post._id} className="mb-2">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div><Card.Title>{post.name}</Card.Title></div>
                <div>
                  <Image
                    style={{ height: "30px" }}
                    src={post.image}
                    roundedCircle
                  />
                </div>
              </div>
              <Card.Subtitle className="mb-2 text-muted"><Moment fromNow>{post.updatedAt}</Moment></Card.Subtitle>
              <Card.Text>
                {post.text}
              </Card.Text>
              <Link to={"/profile/" + post.username}>View Profile</Link>
            </Card.Body>
          </Card>

        )}
      </>
    )
  }

  componentDidMount = async () => {
    let { username, password } = this.props;
    let allUserPosts = [];
    this.setState({
      posts: await GetAllPosts(username, password),
      // allUsers: await GetAllUsers()
    })
    let { posts } = this.state;
    console.log(posts);
    let { allUsers } = this.props;

    for (let i = posts.length - 1; i > 0; i--) {
      for (let j = allUsers.length - 1; j > 0; j--) {
        if (posts[i].username === allUsers[j].username) {
          // console.log(posts[i].text, "by", allUsers[j].name)
          allUserPosts.push({
            _id: posts[i]._id,
            text: posts[i].text,
            username: posts[i].username,
            updatedAt: posts[i].updatedAt,
            name: allUsers[j].name,
            surname: allUsers[j].surname,
            title: allUsers[j].title,
            area: allUsers[j].area,
            image: allUsers[j].image
          })
        }
      }
    }
    // console.log(allUserPosts);
    this.setState({
      allUserPosts: allUserPosts
    })
  }
}

