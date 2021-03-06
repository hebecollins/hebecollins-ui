import React from 'react';
import {validateUserRegistrationFields} from "../../../Toolbox/Validation/helpers";
import {AddUser} from './AddUser';
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick_name: '',
            email: '',
            mobile: '',
            country_code: '',
            isMobileValid: '',
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

    isValid() {
        const {errors, isValid} = validateUserRegistrationFields(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    //called only on mobile no change
    handleMobileNo(status, value, countryData, number) {
        this.setState({mobile: value, country_code: countryData.dialCode, isMobileValid: status})
    }

    onSubmit(e) {
        console.log();
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});//setting state to empty
            this.props.userSignUpRequest(this.state).catch(
                (err) => {
                    const response = errorResponse(err);
                    this.setState({errors: response, isLoading: false})
                }
            )
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p className="white-center">Sign up for free!</p>
                <AddUser
                    onChange={this.onChange}
                    handleMobileNo={this.handleMobileNo}
                    state={this.state}/>

                <div className="form-group">
                    <button disabled={this.state.isLoading}
                            className="btn btn-group-justified btn-hebecollins btn-lg">
                        GET STARTED!
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