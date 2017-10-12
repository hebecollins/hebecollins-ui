import React from 'react';
import LoginForm from "../auth/LoginForm";
import SignUpPage from "../signup/SignUpPage";

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
        // e.preventDefault();
        console.log(this.state.loginFormDisabled);
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
        return (
            <div>
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
                    {this.state.loginFormDisabled ? <LoginForm/> : <SignUpPage/>}
                </div>
            </div>
        )
    }
}

export default LoginAndSignup;
