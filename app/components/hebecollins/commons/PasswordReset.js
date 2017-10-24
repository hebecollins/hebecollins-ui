import React from 'react';
import {TextField} from '../../dumb/commons/inputField/InputFieldWithIcon'
import {validatePassword} from "../../../Toolbox/Validation/helpers";
import {connect} from 'react-redux';
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {passwordResetRequest} from "../../../actions/commons/authActions"
import SingleScreen from "../../dumb/commons/templates/SingleScreen";
import {FormatForm} from "../../dumb/commons/templates/FormatForm";


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
        const {errors, isValid} = validatePassword(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});

            const params = this.props.location.query;
            this.props.passwordResetRequest(this.state, params).catch(
                (err) => {
                    console.log(err);
                    const response = errorResponse(err);
                    this.setState({errors: response, isLoading: false})
                }
            );
        }
    }

    render() {
        const {errors, password, password_confirm, isLoading} = this.state;
        return (
            <div className="content">
                <SingleScreen>
                    <FormatForm
                        iconClass="fa fa-lock"
                        onSubmit={this.onSubmit}
                        instruction="Reset Your Password"
                        isLoading={isLoading}>
                        <TextField
                            field="password"
                            label="Password"
                            value={password}
                            onChange={this.onChange}
                            error={errors.password}
                            iconClass="fa fa-key"
                            type="password"
                        />
                        <TextField
                            field="password_confirm"
                            label="Confirm Password"
                            value={password_confirm}
                            onChange={this.onChange}
                            error={errors.password_confirm}
                            iconClass="fa fa-key"
                            type="password"
                        />
                    </FormatForm>
                </SingleScreen>
            </div>
        )
    }
}

PasswordReset.propTypes = {
    passwordResetRequest: React.PropTypes.func.isRequired
};

export default connect(null, {passwordResetRequest})(PasswordReset);