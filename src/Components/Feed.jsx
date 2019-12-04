import React, { Component } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import GetAllPosts from '../API/GetAllPosts'
export default class Feed extends Component {

  state = {
    posts: []
  }
  render() {

    let { allUsers, myProfile } = this.props
    let { posts } = this.state

    return (
      <>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
                </Button>
        </Form>
        {posts && posts.length > 0 &&
          posts.map(post => (
            <Card >
              <Card.Body>
                <Image
                  style={{ height: "30px" }}
                  src={user.image}
                  roundedCircle
                />
                <Card.Title>{post.username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                  {post.text}
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          ))
        }
      </>
    )
  }

  componentDidMount = async () => {
    this.setState({
      posts: await GetAllPosts()
    })
    // let posts = await GetAllPosts ()
    console.log(this.state.posts)
  }
}

