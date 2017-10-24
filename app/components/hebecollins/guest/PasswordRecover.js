import React from 'react';
import {MobileNumber, Select, TextField} from '../../dumb/commons/inputField/InputFieldWithIcon'
import {validateEmailOrMobile} from "../../../Toolbox/Validation/helpers";
import {connect} from 'react-redux';
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {passwordRecoverRequest} from "../../../actions/commons/authActions"
import {FormatForm} from "../../dumb/commons/templates/FormatForm"
import SingleScreen from "../../dumb/commons/templates/SingleScreen";

class PasswordRecover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            mobile: "",
            country_code: "",
            isMobileValid: '',
            target: "",
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleMobileNo = this.handleMobileNo.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    //called only on mobile no change
    handleMobileNo(status, value, countryData, number) {
        this.setState({mobile: value, country_code: countryData.dialCode, isMobileValid: status})
    }

    isValid() {
        const {errors, isValid} = validateEmailOrMobile(this.state);
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
        const {errors, email, mobile, target, isLoading} = this.state;
        return (
            <div className="content">
                <SingleScreen>
                    <FormatForm
                        iconClass="fa fa-lock"
                        onSubmit={this.onSubmit}
                        instruction="How would you like to recover your password?"
                        isLoading={isLoading}
                        submitButton={false}>

                        <Select
                            field="target"
                            label="Select a password recovery option"
                            error={errors.target}
                            onChange={this.onChange}
                            isIconNeeded={false}
                        >
                            <option value='mobile'>Text me the recovery link</option>
                            <option value='email'>Email me the recovery link</option>

                        </Select>

                        {this.state.target === "email" ?
                            <div>
                                <TextField
                                    field="email"
                                    label="Email"
                                    value={email}
                                    onChange={this.onChange}
                                    iconClass="glyphicon glyphicon-envelope"
                                    error={errors.email}
                                />
                                <button disabled={isLoading} onClick={this.onSubmit}
                                        className="btn btn-group-justified btn-hebecollins btn-lg">
                                    Send Me Recovery Link
                                </button>
                            </div>

                            : this.state.target === "mobile" ?
                                <div>
                                    <MobileNumber
                                        field="mobile"
                                        value={mobile}
                                        handleMobileNo={this.handleMobileNo}
                                        error={errors.mobile}
                                    />

                                    <button disabled={isLoading} onClick={this.onSubmit}
                                            className="btn btn-group-justified btn-hebecollins btn-lg">
                                        Send Me Recovery Link
                                    </button>
                                </div>
                                : <div></div>
                        }
                    </FormatForm>
                </SingleScreen>
            </div>
        )
    }
}

PasswordRecover.propTypes = {
    passwordRecoverRequest: React.PropTypes.func.isRequired
};

export default connect(null, {passwordRecoverRequest})(PasswordRecover);