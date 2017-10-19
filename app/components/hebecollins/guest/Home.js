import React from 'react';
import {connect} from 'react-redux';
import Description from "../../dumb/guest/Description";
import LoginAndSignup from "../../dumb/guest/LoginAndSignup";
import {userSignUpRequest} from '../../../actions/guest/signUpActions'
import {addFlashMessage} from '../../../actions/commons/flashMessages';
import {loginRequest} from "../../../actions/commons/authActions"
import TwoScreen from "../../dumb/commons/templates/TwoScreen";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {userSignUpRequest, addFlashMessage, loginRequest} = this.props;
        return (
            <div className="content">
                <TwoScreen>
                    <Description key="desktopOnly"/>
                    <LoginAndSignup
                        key="mobileVisible"
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

export default connect(null, {userSignUpRequest, addFlashMessage, loginRequest})(Home);
