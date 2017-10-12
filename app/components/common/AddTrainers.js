import React from 'react';
import validateInput from "../../Toolbox/Validation/category/signup";
import {browserHistory} from 'react-router';
import AddUser from '../dumbComponents/UserFormRegister';
import {errorResponse} from "../../Toolbox/Helpers/responseHandler";
import {addUserToDBAndStore} from "../../actions/common/addUser"
import {connect} from 'react-redux';

require('../../css/contentBox.css');

class AddTrainers extends React.Component {
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
        this.submit = this.submit.bind(this);
        this.addMore = this.addMore.bind(this);
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

    //called only on mobile no change
    handleMobileNo(status, value, countryData, number) {
        this.setState({mobile: value, country_code: countryData.dialCode, isMobileValid: status})
    }

    addMore(e) {
        console.log(this.state);
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.props.addUserToDBAndStore(this.state, 'trainer');
        }
        this.setState({
            nick_name: '',
            email: '',
            mobile: '',
            country_code: '',
            isMobileValid: '',
            errors: {},
            isLoading: false
        });
    }

    submit(e) {
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

                <AddUser
                    onChange={this.onChange}
                    handleMobileNo={this.handleMobileNo}
                    state={this.state}/>
                <div className="btn-group btn-group-justified">
                    <a className="btn btn-hebecollins btn-lg"
                       name="login" onClick={this.addMore}
                       disabled={this.state.isLoading}>Add More</a>
                    <a className="btn btn-hebecollins btn-lg"
                       name="signup" onClick={this.submit}
                       disabled={this.state.signupFormDisabled}>Done</a>
                </div>

            </form>
        );
    }
}

AddTrainers.propTypes = {
    mapStateToProps:React.PropTypes.func.isRequired,
    addUserToDBAndStore: React.PropTypes.func.isRequired
};

export default connect(null, {addUserToDBAndStore})(AddTrainers);