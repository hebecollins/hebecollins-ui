import React from 'react';
import TextFieldGroup from '../../dumb/commons/TextFieldGroup'
import {validateEmail} from "../../../Toolbox/Validation/helpers";
import {connect} from 'react-redux';
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {passwordRecoverRequest} from "../../../actions/commons/authActions"
import {FormatForm} from "../../dumb/commons/FormatForm"
import {validate} from "../../../Toolbox/Validation/validator";


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
        const {errors, isValid} = validateEmail(this.state);
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
            <FormatForm
                onSubmit={this.onSubmit}
                instruction="Enter Your Email"
                isLoading={isLoading}>
                <TextFieldGroup
                    field="email"
                    label="Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                /></FormatForm>
        )
    }
}

PasswordRecover.propTypes = {
    passwordRecoverRequest: React.PropTypes.func.isRequired
};

export default connect(null, {passwordRecoverRequest})(PasswordRecover);