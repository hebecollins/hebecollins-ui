import React from 'react';
import SignUpForm from './SignUpForm';
import {connect} from 'react-redux';
import {userSignUpRequest} from '../../actions/signUpActions'
import {addFlashMessage} from '../../actions/flashMessages';

class SignUpPage extends React.Component{
    render() {
        const {userSignUpRequest, addFlashMessage}=this.props;
        console.log("usersignup page"+ userSignUpRequest);
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignUpForm userSignUpRequest={userSignUpRequest} addFlashMessage={addFlashMessage}/>
                </div>
            </div>
        );
    }
}

SignUpPage.propTypes={
    userSignUpRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};


export default connect(null,{userSignUpRequest, addFlashMessage})(SignUpPage);
