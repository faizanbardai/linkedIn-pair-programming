import React, { Component } from 'react'
import GetAllUsers from '../API/GetAllUsers'
import { Card, Image, CardDeck } from 'react-bootstrap'

export default class Network extends Component {
    state = {
        friends: []
    }
    render() {
        let { friends } = this.state
        return (
            <CardDeck className="row">
                {friends.map(friend => (<Card className="col-sm">
                    <Card.Img variant="top" src={"holder.js/100px160"} />
                    <Card.Body>
                        <Card.Title>{friend.name} {friend.surname}</Card.Title>
                        <Card.Text>
                           {friend.bio}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Italy</small>
                    </Card.Footer>
                </Card>))} 
            </CardDeck>
        )
    }

    componentDidMount = async () => {
        let friends = await GetAllUsers("user22", "ykeZdCYNLs2dqbMc");
        this.setState({ friends: friends });
        // console.log(this.state.friends.map(friend => friend.name));
        console.log(this.state.friends);
    }
}

