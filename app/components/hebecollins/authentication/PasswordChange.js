import React from 'react';
import {TextField} from '../../others/inputField/InputFieldWithIconAddOn'
import {validateChangedPassword} from "../../../Toolbox/Validation/helpers";
import {connect} from 'react-redux';
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {FormatForm} from "../../others/frames/FormatForm";
import {passwordChangeRequest} from "../../../actions/authActions"
import SingleScreen from "../../others/frames/SingleScreen";

class PasswordChange extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            old_password: "",
            new_password: "",
            confirm_new_password: "",
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
        const {errors, isValid} = validateChangedPassword(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.passwordChangeRequest(this.state).catch(
                (err) => {
                    const response = errorResponse(err);
                    this.setState({errors: response, isLoading: false})
                }
            );
        }
    }

    render() {
        const {errors, old_password, new_password, confirm_new_password, isLoading} = this.state;
        return (
            <div className="content">
                <SingleScreen>
                    <FormatForm
                        iconClass="fa fa-lock"
                        onSubmit={this.onSubmit}
                        instruction="Change Your password"
                        submitLabel="Submit"
                        isLoading={isLoading}
                        enableImage={false}
                    >
                        <TextField
                            field="old_password"
                            value={old_password}
                            label="Old Password"
                            type="password"
                            iconClass="fa fa-key"
                            error={errors.old_password}
                            onChange={this.onChange}
                        />

                        <TextField
                            field="new_password"
                            value={new_password}
                            label="New Password"
                            type="password"
                            iconClass="fa fa-key"
                            error={errors.new_password}
                            onChange={this.onChange}
                        />

                        <TextField
                            field="confirm_new_password"
                            value={confirm_new_password}
                            label="Confirm New Password"
                            type="password"
                            iconClass="fa fa-key"
                            error={errors.confirm_new_password}
                            onChange={this.onChange}
                        />
                    </FormatForm>
                </SingleScreen>
            </div>
        )
    }
}

PasswordChange.propTypes = {
    passwordChangeRequest: React.PropTypes.func.isRequired
};

export default connect(null, {passwordChangeRequest})(PasswordChange);