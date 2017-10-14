import React from 'react';
import TextFieldGroup from '../dumbComponents/TextFieldGroup'
import validateInput from "../../Toolbox/Validation/category/login";
import {connect} from 'react-redux';
import {loginRequest} from "../../actions/authActions"
import {errorResponse} from "../../Toolbox/Helpers/responseHandler";
import {browserHistory} from 'react-router';
import {addFlashMessage} from "../../actions/flashMessages";
import {passwordRecoverRequest} from "../../actions/authActions"

class PasswordRecover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
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

            this.props.passwordRecoverRequest(this.state).catch(
                (err) => {
                    const response = errorResponse(err);
                    this.setState({errors: response, isLoading: false})
                }
            );
        }
    }

    render() {
        const {errors, email, isLoading} = this.state;
        return (
            <div className="passwordRecover">
                <div className="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6">
                    <div className="hebecollins-content-child">
                        <img className="logo-extended" src={require('./../../../images/HC_logo_extended.jpg')}/>
                        <form className="form-hebecollins" onSubmit={this.onSubmit}>
                            <p className="white-center">Enter Your email to get a password-reset link</p>
                            <TextFieldGroup
                                field="email"
                                label="Email"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
                            />
                            <div className="form-group">
                                <button disabled={isLoading} className="btn btn-group-justified btn-hebecollins btn-lg">
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

PasswordRecover.propTypes = {
    passwordRecoverRequest: React.PropTypes.func.isRequired
};

export default connect(null, {passwordRecoverRequest})(PasswordRecover);