import React from 'react';
import TextFieldGroup from '../../dumb/commons/TextFieldGroup'
import validateInput from "../../../Toolbox/Validation/category/login";
import {connect} from 'react-redux';
import {loginRequest} from "../../../actions/commons/authActions"
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {browserHistory} from 'react-router';
import {addFlashMessage} from "../../../actions/commons/flashMessages";
import {passwordResetRequest} from "../../../actions/commons/authActions"

class PasswordReset extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            password_confirm: "",
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

            const params= this.props.location.query;
            this.props.passwordResetRequest(this.state,params ).catch(
                (err) => {
                    const response = errorResponse(err);
                    this.setState({errors: response, isLoading: false})
                }
            );
        }
    }

    render() {
        const {errors, password, password_confirm, isLoading} = this.state;
        return (
            <div className="container-fluid">
                <div className="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6">
                    <img className="logo-extended" src={require('../../../../images/HC_logo_extended.jpg')}/>
                    <form className="form-hebecollins" onSubmit={this.onSubmit}>
                        <p className="white-center">Enter a new password</p>
                        <TextFieldGroup
                            field="password"
                            label="Password"
                            value={password}
                            onChange={this.onChange}
                            error={errors.password}
                            type="password"
                        />
                        <TextFieldGroup
                            field="password_confirm"
                            label="Confirm Password"
                            value={password_confirm}
                            onChange={this.onChange}
                            error={errors.password_confirm}
                            type="password"
                        />
                        <div className="form-group">
                            <button disabled={isLoading} className="btn btn-group-justified btn-hebecollins btn-lg">
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

PasswordReset.propTypes = {
    passwordResetRequest: React.PropTypes.func.isRequired
};

export default connect(null, {passwordResetRequest})(PasswordReset);