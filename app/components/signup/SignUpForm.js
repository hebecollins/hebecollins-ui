import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from "../../Toolbox/Validation/signup";
import {browserHistory} from 'react-router';
import TextFieldGroup from '../common/TextFieldGroup';

//for country code flag with mobile no.
import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!./../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import './../../../node_modules/react-intl-tel-input/dist/main.css';


class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_name: '',
            email: '',
            mobile: '',
            country_code: '',
            isMobileValid: '',
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

    handleMobileNo(status, value, countryData, number) {
        console.log(countryData);
        this.setState({mobile: value, country_code: countryData.dialCode, isMobileValid: status})
    }

    onSubmit(e) {
        e.preventDefault();//to avoid storing default value

        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});//setting state to empty
            this.props.userSignUpRequest(this.state).then(
                (res) => {
                    browserHistory.push('/');
                    this.props.addFlashMessage({
                        type: 'success',
                        text: res.data.msg
                    })
                },
                (err) => this.setState({errors: err.data.errors, isLoading: false})
            )
        }
    }


    render() {

        const {errors} = this.state;
        console.log(errors);
        console.log("see this");
        // const options = map(timezones, (val, key) =>
        //     <option value={val} key={val}>{key}</option>
        // );
        return (
            <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                    error={errors.nick_name}
                    label="Nick Name"
                    onChange={this.onChange}
                    value={this.state.nick_name}
                    field="nick_name"
                />

                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    field="email"
                />

                <div className={classnames("form-group", {'has-error': errors.mobile})}>
                    <span className="glyphicon glyphicon-phone"/>
                    <label className="control-label">Mobile No.</label><br/>
                    <IntlTelInput
                        fieldName={"mobile"}
                        value={this.state.mobile}
                        onPhoneNumberChange={this.handleMobileNo}
                        preferredCountries={['in']}
                        placeholder={'9876543210'}
                        numberType="MOBILE"
                        style={{width:'100%'}}
                        css={['intl-tel-input', 'form-control']}
                        utilsScript={'libphonenumber.js'}
                    />
                    {errors.mobile && <span className="help-block">{errors.mobile}</span>}
                </div>

                <div className="form-group">
                    <button disabled={this.state.isLoading}
                            className="btn btn-group-justified btn-primary btn-lg">
                        Get Started Now!
                    </button>
                </div>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    userSignUpRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

export default SignUpForm;
