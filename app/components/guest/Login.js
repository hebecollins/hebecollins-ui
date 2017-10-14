import React from 'react';
import TextFieldGroup from '../dumbComponents/TextFieldGroup'
import validateInput from "../../Toolbox/Validation/category/login";
import {connect} from 'react-redux';
import {loginRequest} from "../../actions/authActions"
import {errorResponse} from "../../Toolbox/Helpers/responseHandler";
import backendRoutes from 'backendRoutes';

require('../../css/contentBox.css');

class LoginForm extends React.Component {

   //defining state
    constructor(props) {
        super(props);
        this.state = {
            identifier: "",
            password: "",
            remember: false,
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        if (e.target.name === "remember") {
            this.setState({remember: e.target.checked})
        }
    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});

            this.props.loginRequest(this.state).catch(
                (err) => {
                    const response=errorResponse(err);
                    this.setState({errors: response, isLoading: false})
                }
            );
        }
    }

    render() {
        const {errors, identifier, password, remember, isLoading} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <p className="white-center">Welcome!</p>
                <TextFieldGroup
                    field="identifier"
                    label="Email/Mobile"
                    value={identifier}
                    onChange={this.onChange}
                    error={errors.identifier}
                />

                <TextFieldGroup
                    field="password"
                    label="Password"
                    value={password}
                    onChange={this.onChange}
                    error={errors.password}
                    type="password"
                />

                <div className="remember">
                    <input
                        value={remember}
                        onChange={this.onChange}
                        type="checkbox"
                        name="remember"
                        className="form-group"
                    />
                    <label className="checkbox-text">Remember Me</label>
                </div>
                <div className="form-group">
                    <button disabled={isLoading} className="btn btn-group-justified btn-hebecollins btn-lg">Submit
                    </button>
                </div>

                <label className="control-label">
                    <a className="forgot-password" href={backendRoutes.password_recover}>forgot password?</a>
                </label>
            </form>
        )
    }
}

LoginForm.propTypes = {
    loginRequest: React.PropTypes.func.isRequired
};

export default LoginForm;