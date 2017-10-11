import React from 'react';
import Navigation from "../common/Navigation";
import FlashMessageList from './../flash/FlashMessageList'
import {connect} from 'react-redux';
import Description from "./../hebecollins/Description";
import LoginAndSignup from "./../hebecollins/LoginAndSignup";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {isAuthenticated} = this.props.auth;
        const {user_type} = this.props.auth.user;
        const guestHomePage = (
            <div className="container">
                <div className="col col-lg-8 col-md-8 col-sm-6 hidden-xs">
                    <div className="col col-lg-9 col-md-9">
                        <Description/>
                    </div>
                </div>
                <div className="col col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <LoginAndSignup/>
                </div>
            </div>
        );

        return (
            <div>
                {/*<Navigation/>*/}
                {isAuthenticated ?
                    <div>
                        <h1>Work under progress! I am a {user_type}</h1>
                        <h2>'GYM' coloumn is for anyone having multiple gym access.
                        It can be a trainer, manager or a client</h2>
                    </div>

                    : guestHomePage
                }
            </div>
        )
    }
}

Home.propTypes = {
    auth: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Home);