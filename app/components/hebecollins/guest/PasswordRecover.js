import React from 'react';
import TextFieldGroup from '../../dumb/commons/TextFieldGroup'
import {validateEmailOrMobile} from "../../../Toolbox/Validation/helpers";
import {connect} from 'react-redux';
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {passwordRecoverRequest} from "../../../actions/commons/authActions"
import {FormatForm} from "../../dumb/commons/templates/FormatForm"
import classnames from 'classnames';
import SingleScreen from "../../dumb/commons/templates/SingleScreen";

import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!../../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import './../../../../node_modules/react-intl-tel-input/dist/main.css';

class PasswordRecover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            mobile: "",
            country_code:"",
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
                        <div className={classnames('form-group', {'has-error': errors.gender})}>
                            <select
                                className="select form-control"
                                onChange={this.onChange}
                                name="target">
                                <option className="select-placeholder" disabled="disabled" selected="selected">Select
                                    a recovery medium
                                </option>
                                <option value='mobile'>Text me the recovery link</option>
                                <option value='email'>Email me the recovery link</option>
                            </select>
                            {errors.target && <span className="help-block">{errors.target}</span>}
                        </div>
                        {this.state.target === "email" ?
                            <div>
                                <TextFieldGroup
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

                                <div><div className={classnames("form-group", {'has-error': errors.mobile})}>
                                    <div className="input-group">
                            <span className="icon-text-field input-group-addon">
                                <i className="glyphicon glyphicon-phone"/>
                            </span>
                                        <IntlTelInput
                                            fieldName={"mobile"}
                                            value={mobile}
                                            onPhoneNumberChange={this.handleMobileNo}
                                            preferredCountries={['in']}
                                            placeholder={'Mobile number'}
                                            numberType="MOBILE"
                                            style={{width: '100%'}}
                                            css={['intl-tel-input', 'form-control']}
                                            utilsScript={'libphonenumber.js'}
                                        /></div>
                                    {errors.mobile && <span className="help-block">{errors.mobile}</span>}
                                    </div>
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