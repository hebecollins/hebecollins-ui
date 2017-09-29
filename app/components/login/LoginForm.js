import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup'
import validateInput from "../../Toolbox/Validation/login";
import {connect} from 'react-redux';
import { loginRequest } from "../../actions/loginActions"

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identifier: "",
            password: "",
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
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

            this.props.loginRequest(this.state).then(
                (res)=>console.log(res.data),
                (err)=> this.setState({errors: err.data.errors, isLoading: false})
            );
        }
    }

    render() {
        const {errors, identifier, password, isLoading} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
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
                <div className="form-group">
                    <button disabled={isLoading} className="btn btn-primary btn-lg">Login</button>
                </div>
            </form>
        )
    }
}

LoginForm.propTypes = {
    loginRequest: React.PropTypes.func.isRequired
};

export default connect(null, {loginRequest})( LoginForm);