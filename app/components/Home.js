import React from 'react';
import {connect} from 'react-redux';
import Description from "./others/frames/Description";
import LoginAndSignup from "./others/frames/LoginAndSignup";
import {registerManager} from '../actions/registerActions'
import {addFlashMessage} from '../actions/actionStore';
import {loginRequest} from "../actions/authActions"
import {TwoScreen} from "./others/frames/TwoScreen";

class Home extends React.Component {
    render() {
        const {userSignUpRequest, addFlashMessage, loginRequest} = this.props;
        return (
            <div className="content">
                <TwoScreen>
                    <Description key="desktopOnly" alignment="left"/>
                    <LoginAndSignup
                        key="mobileVisible"
                        alignment="right"
                        loginRequest={loginRequest}
                        userSignUpRequest={userSignUpRequest}
                        addFlashMessage={addFlashMessage}/>
                </TwoScreen>
            </div>
        )
    }
}

Home.propTypes = {
    userSignUpRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    loginRequest: React.PropTypes.func.isRequired
};

export default connect(null, {userSignUpRequest: registerManager, addFlashMessage, loginRequest})(Home);
