import RetrieveProfile from '../API/RetrieveProfile'
import { withRouter } from "react-router";
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import GetExperience from '../API/GetExperience'
import DeleteExperience from '../API/DeleteExperience';
import ProfileIntro from './ProfileIntro';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Experience from './Experience';

class Profile extends Component {
    state = {
        loading: true,
        personal: "" // show "edit profile and add exp." button only on personal profile page
    }

    addNewExperience = (newExp) => {
        this.setState({
            experiences: this.state.experiences.concat(newExp)
        })
    }
    deleteExperience = async (item) => {
        let { username, password } = this.props;
        let response = await DeleteExperience(item, username, password);
        response.status === 200 && this.setState({ experiences: this.state.experiences.filter(experience => experience._id !== item) })
    }
    updateProfile = (profile) => {
        this.setState({
            profile: profile
        })
    }

    render() {
        let { loading, profile, experiences, personal } = this.state;
        let { username, password } = this.props;
        return (
            <>
                {loading ?
                    <div className="d-flex justify-content-center">
                        <Loader type="Oval" color="green" height={80} width={80} />
                    </div>
                    :
                    <section className="container">
                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>
                                {profile ? (
                                    <ProfileIntro
                                        username={username}
                                        password={password}
                                        personal={personal}
                                        profile={profile}
                                        updateProfile={this.updateProfile}
                                    />
                                ) : (
                                        <div>Sorry no user found!</div>
                                    )
                                }
                                {experiences && 
                                    <Experience
                                        username={username} password={password}
                                        personal={personal} experiences={experiences}
                                        addNewExperience={this.addNewExperience}
                                        deleteExperience={this.deleteExperience}
                                    />
                                }
                            </Col>
                        </Row>
                    </section>
                }
            </>
        )
    }
    componentDidMount = () => {
        this.updateProfileAndExperience();
    }
    componentDidUpdate = (prevProps) => {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.updateProfileAndExperience();
        }
    }
    updateProfileAndExperience = async () => {
        let { username, password } = this.props;
        let user = this.props.match.params.username;
        //Example: user24, admin, me
        this.setState({ personal: user === "me" || user === username });
        if(user === "me") {user=username};
        let profile = await RetrieveProfile(user, username, password);
        let experiences;
        if (profile) { experiences = await GetExperience(user, username, password); }
        this.setState({
            profile: profile,
            experiences: experiences,
            loading: false
        })
    }
}
export default withRouter(Profile)