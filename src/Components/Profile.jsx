import RetrieveProfile from '../API/RetrieveProfile'
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import GetExperience from '../API/GetExperience'
import Experience from './Experience';
import ProfileIntro from './ProfileIntro';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export default class Profile extends Component {
    state = {
        loading: true,
        personal: "" // show "edit profile and add exp." button only on personal profile page
    }

    addNewExperience = (newExp) => {
        this.setState({
            experiences: this.state.experiences.concat(newExp)
        })
    }
    updateProfile = (profile) => {
        this.setState({
            profile: profile
        })
    }

    render() {

        let { loading, profile, experiences, personal } = this.state;

        return (
            <>
                {loading ?

                    <div className="d-flex justify-content-center">
                        <Loader type="Oval" color="green" height={80} width={80} />
                    </div>
                    :
                    <section>
                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>
                                {profile ? (
                                    <ProfileIntro
                                        personal={personal}
                                        profile={profile}
                                        updateProfile={this.updateProfile}
                                    />
                                ) : (
                                        <div>Sorry no user found!</div>
                                    )
                                }
                                {experiences && <Experience profileID={profile._id} personal={personal} experiences={experiences} addNewExperience={this.addNewExperience} />}
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
        this.setState({ personal: user === "me" });
        let profile = await RetrieveProfile(user, username, password);
        let experiences;
        if (profile) { experiences = await GetExperience(profile.username, username, password); }
        this.setState({
            profile: profile,
            experiences: experiences,
            loading: false
        })
    }
}