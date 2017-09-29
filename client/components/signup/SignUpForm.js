import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from "../../Toolbox/Validation/signup";
import {browserHistory} from 'react-router';

//for country code flag with mobile no.
import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!./../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import './../../../node_modules/react-intl-tel-input/dist/main.css';
//for country code flag with mobile no.


class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_name: '',
            email: '',
            mobile: '',
            country_code:'',
            isMobileValid:'',
            // timezone:'',
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleMobileNo = this.handleMobileNo.bind(this);

    }

    onChange(e) {
        console.log(this.state)
        this.setState({[e.target.name]: e.target.value});
    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    handleMobileNo(status, value, countryData, number){
        console.log(countryData);
        this.setState({mobile:value, country_code:countryData.dialCode, isMobileValid:status})
    }

    onSubmit(e) {
        e.preventDefault();//to avoid storing default value

        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});//setting state to empty
            this.props.userSignUpRequest(this.state).then(
                (response) => {
                    if (!response.data.status) {
                        this.setState({errors: response.data.errors, isLoading: false})
                    }
                    if(response.data.status){
                        browserHistory.push('/');
                    }
                }
            )
        }
    }

    render() {

        const {errors} = this.state;
        console.log(errors);
        console.log("see this");
        const options = map(timezones, (val, key) =>
            <option value={val} key={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Become A Member Now!</h1>
                <div className={classnames("form-group", {'has-error': errors.nick_name})}>
                    <label className="control-label">Nickname</label>
                    <input
                        value={this.state.nick_name}
                        onChange={this.onChange}
                        type="text"
                        name="nick_name"
                        className="form-control"
                    />
                    {errors.nick_name && <span className="help-block">{errors.nick_name}</span>}
                </div>

                <div className={classnames("form-group", {'has-error': errors.email})}>
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                    />
                    {errors.email && <span className="help-block">{errors.email}</span>}

                </div>

                <div className={classnames("form-group", {'has-error': errors.mobile})}>

                    <label className="control-label">Mobile No.</label>
                    {/*<input*/}
                        {/*value={this.state.mobile}*/}
                        {/*onChange={this.onChange}*/}
                        {/*type="text"*/}
                        {/*name="mobile"*/}
                        {/*className="form-control"*/}
                    {/*/>*/}

                    <IntlTelInput
                        fieldName={"mobile"}
                        value={this.state.mobile}
                        onPhoneNumberChange={this.handleMobileNo}
                        preferredCountries={['in']}
                        placeholder = {'9876543210'}
                        numberType="MOBILE"
                        css={ ['intl-tel-input', 'form-control'] }
                        utilsScript={ 'libphonenumber.js' }
                    />
                    {errors.mobile && <span className="help-block">{errors.mobile}</span>}

                </div>

                {/*<div className={classnames("form-group",{'has-error':errors.passwordConfirm})}>*/}
                {/*<label className="control-label">Confirm Password</label>*/}
                {/*<input*/}
                {/*value={this.state.passwordConfirm}*/}
                {/*onChange={this.onChange}*/}
                {/*type="password"*/}
                {/*name="passwordConfirm"*/}
                {/*className="form-control"*/}
                {/*/>*/}
                {/*{errors.passwordConfirm && <span className="help-block">{errors.passwordConfirm}</span>}*/}

                {/*</div>*/}

                {/*<div className={classnames("form-group",{'has-error':errors.timezone})}>*/}
                {/*<label className="control-label">Timezone</label>*/}
                {/*<select*/}
                {/*value={this.state.timezone}*/}
                {/*onChange={this.onChange}*/}
                {/*name="timezone"*/}
                {/*className="form-control"*/}
                {/*>*/}
                {/*<option value="" disabled>Choose Your Timezone</option>*/}
                {/*{options}*/}
                {/*</select>*/}
                {/*{errors.timezone && <span className="help-block">{errors.timezone}</span>}*/}
                {/*</div>*/}

                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    userSignUpRequest: React.PropTypes.func.isRequired
};

export default SignUpForm;
