import React from 'react';
import SignUpPage from './signup/SignUpPage';
import LoginPage from "./login/LoginPage";

class Greetings extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loginFormActive:false,
            signupFormActive:true
        };
        this.onClick=this.onClick.bind(this);
    };

    onClick(e){
        this.setState({
            loginFormActive:!this.state.loginFormDisabled,
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col col-lg-8 col-md-8 col-sm-12 col-es-12">
                </div>
                <div className="col col-lg-4 col-md-4 col-sm-12 col-es-12">
                    <div className="btn-group">
                        <button className="btn btn-primary btn-lg"
                                name="signup" onClick={this.onClick}
                                disabled={this.state.loginFormDisabled}>Signup</button>
                        <button className="btn btn-primary btn-lg"
                                name="login" onClick={this.onClick}
                        disabled={!this.state.loginFormDisabled}>Login</button>
                    </div>
                    <SignUpPage/>
                    <LoginPage/>
                </div>
            </div>
        );
    }
}

export default Greetings;
