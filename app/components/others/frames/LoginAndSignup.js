import React from 'react';
import Login from "../inputFieldGroup/Login";
import SignUp from '../inputFieldGroup/SignUp';

class LoginAndSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginFormDisabled: true,
            signupFormDisabled: false
        };
        this.onClick = this.onClick.bind(this);
    };

    onClick(e) {
        e.preventDefault();
        if (this.state.loginFormDisabled === false && e.target.name === "login") {
            this.setState({
                loginFormDisabled: !this.state.loginFormDisabled,
                signupFormDisabled: !this.state.signupFormDisabled
            });
        }
        if (this.state.signupFormDisabled === false && e.target.name === "signup") {
            this.setState({
                loginFormDisabled: !this.state.loginFormDisabled,
                signupFormDisabled: !this.state.signupFormDisabled
            });
        }
    }

    render() {
        const {userSignUpRequest, addFlashMessage, loginRequest} = this.props;
        return (
            <div className="row">
                <div className="col col-lg-offset-2 col-lg-10">
                    <div className="login-signup">
                        <div className="btn-group btn-group-justified">
                            <a className="btn btn-hebecollins-reverse btn-lg"
                               name="login" onClick={this.onClick}
                               disabled={this.state.loginFormDisabled}>Login</a>
                            <a className="btn btn-hebecollins-reverse btn-lg"
                               name="signup" onClick={this.onClick}
                               disabled={this.state.signupFormDisabled}>Signup</a>
                        </div>
                        <br/>
                        <div>
                            {
                                this.state.loginFormDisabled ?
                                    <Login
                                        loginRequest={loginRequest}/> :
                                    <SignUp
                                        userSignUpRequest={userSignUpRequest}
                                        addFlashMessage={addFlashMessage}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

LoginAndSignup.propTypes = {
    userSignUpRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    loginRequest: React.PropTypes.func.isRequired
};

export default LoginAndSignup;
