import React from 'react';
import SignUpForm from './SignUpForm';
import {connect} from 'react-redux';
import {userSignUpRequest} from '../../actions/signUpActions'

class SignUpPage extends React.Component{
    render() {
        const {userSignUpRequest}=this.props;
        console.log("usersignup page"+ userSignUpRequest);
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignUpForm userSignUpRequest={userSignUpRequest}/>
                </div>
            </div>
        );
    }
}

SignUpPage.propTypes={
    userSignUpRequest: React.PropTypes.func.isRequired
};


export default connect(null,{userSignUpRequest})(SignUpPage);
