import React from 'react';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';

//for country code flag with mobile no.
import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!./../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import './../../../node_modules/react-intl-tel-input/dist/main.css';


class AddUser extends React.Component {
//todo: make it use its own state to do the validation, so that it can be reused in case of addClient and addTrainer
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         nick_name: '',
    //         email: '',
    //         mobile: '',
    //         country_code: '',
    //         isMobileValid: '',
    //         errors: {},
    //         isLoading: false
    //     };
    //
    //     // this.onChange = this.onChange.bind(this);
    //     this.handleMobileNo = this.handleMobileNo.bind(this);
    //
    // }
    //
    // // onChange(e) {
    // //     console.log(this.state);
    // //     this.setState({[e.target.name]: e.target.value});
    // // }
    //
    // isValid() {
    //     const {errors, isValid} = validateInput(this.state);
    //     if (!isValid) {
    //         this.setState({errors});
    //     }
    //     return isValid;
    // }
    //
    // handleMobileNo(status, value, countryData, number) {
    //     console.log(countryData);
    //     this.setState({mobile: value, country_code: countryData.dialCode, isMobileValid: status})
    // }

    render() {
        const {errors} = this.props.state;
        return (
            <div>
                <TextFieldGroup
                    error={errors.nick_name}
                    label="Nick Name"
                    onChange={this.props.onChange}
                    value={this.props.state.nick_name}
                    field="nick_name"
                />

                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.props.onChange}
                    value={this.props.state.email}
                    field="email"
                />

                <div className={classnames("form-group", {'has-error': errors.mobile})}>
                    <IntlTelInput
                        fieldName={"mobile"}
                        value={this.props.state.mobile}
                        onPhoneNumberChange={this.props.handleMobileNo}
                        preferredCountries={['in']}
                        placeholder={'Mobile number'}
                        numberType="MOBILE"
                        style={{width: '100%'}}
                        css={['intl-tel-input', 'form-control']}
                        utilsScript={'libphonenumber.js'}
                    />
                    {errors.mobile && <span className="help-block">{errors.mobile}</span>}
                </div>
            </div>
        );
    }
}

AddUser.propTypes = {
    // addUserRequest: React.PropTypes.func.isRequired,
    // addFlashMessage: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    handleMobileNo:React.PropTypes.func.isRequired,
    state:React.PropTypes.object.isRequired
};

export default AddUser;
