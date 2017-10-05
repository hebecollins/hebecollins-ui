import React from 'react';
import validateInput from "../../Toolbox/Validation/category/signup";
import {browserHistory} from 'react-router';
import AddUser from './../common/AddUser';

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
        console.log();
        e.preventDefault();
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
                (err) => {
                    console.log(err);
                    this.setState({errors: err.response.data.errors, isLoading: false})
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