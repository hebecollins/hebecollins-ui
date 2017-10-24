import React from 'react';
import {TextField} from '../commons/inputField/InputFieldWithIcon'
import {validateLogin} from "../../../Toolbox/Validation/helpers";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {getRouteByName} from "../../../Toolbox/Helpers/routeHandler";

class LoginForm extends React.Component {

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
        const {errors, isValid} = validateLogin(this.state);
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
                    if (response !== null) {
                        this.setState({errors: response, isLoading: false})
                    }
                }
            );
        }
    }

    render() {
        const {errors, identifier, password, remember, isLoading} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <p className="white-center">Welcome!</p>
                <TextField
                    field="identifier"
                    label="Email/Mobile"
                    value={identifier}
                    iconClass="glyphicon glyphicon-user"
                    onChange={this.onChange}
                    error={errors.identifier}
                />

                <TextField
                    field="password"
                    label="Password"
                    value={password}
                    onChange={this.onChange}
                    iconClass="fa fa-key"
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
                    <a className="forgot-password" href={getRouteByName('PASSWORD_RECOVER')}>forgot password?</a>
                </label>
            </form>
        )
    }
}

LoginForm.propTypes = {
    loginRequest: React.PropTypes.func.isRequired
};

export default LoginForm;