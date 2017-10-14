import React from 'react';
import FlashMessageList from '../../smart/commons/FlashMessageList'
import {connect} from 'react-redux';
import Description from "../../dumb/guest/Description";
import LoginAndSignup from "../../dumb/guest/LoginAndSignup";
import {userSignUpRequest} from '../../../actions/signUpActions'
import {addFlashMessage} from '../../../actions/flashMessages';
import {loginRequest} from "../../../actions/authActions"

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {userSignUpRequest, addFlashMessage, loginRequest} = this.props;
        const guestHomePage = (
            <div className="row">
                <div className="col col-lg-6 col-md-6 hidden-sm hidden-xs">
                    <div className="left">
                        <div className="hebecollins-content-child">
                            <Description/>
                        </div>
                    </div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="right">
                        <div className="hebecollins-content-child">
                            <LoginAndSignup
                                loginRequest={loginRequest}
                                userSignUpRequest={userSignUpRequest}
                                addFlashMessage={addFlashMessage}/>
                            />
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                <div className="hebecollins-absolute">
                    <FlashMessageList/>
                </div>
                <div className="hebecollins-needs-alert">
                    {guestHomePage}
                </div>
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
