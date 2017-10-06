import React from 'react';
import TextFieldGroup from './../common/TextFieldGroup'
import validateInput from "../../Toolbox/Validation/category/activate";
import {browserHistory} from 'react-router';
import Address from './../common/Address';
import UserDetails from './../common/UserDetails';
import {message} from './../../Toolbox/Validation/messages'

class Activate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            middle_name: '',
            last_name: '',
            dob: '',
            gender: '',
            gym_name: '',
            street_address: '',
            locality: '',
            district: '',
            pin: '',
            state: '',
            country: '',
            password: '',
            password_confirm: '',
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDobUpdate= this.onDobUpdate.bind(this);
    }

    onChange(e) {
        console.log(this.state);
        this.setState({[e.target.name]: e.target.value});
    }

    onDobUpdate(dob) {
            this.state.dob = dob.format("YYYY-MM-DD")
    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        console.log(errors);
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});//setting state to empty

            //action call
            this.props.activateManagerRequest(this.state, this.props.params).then(
                (res) => {
                    console.log("passed");
                    console.log(res);
                    browserHistory.push('/');
                    this.props.addFlashMessage({
                        type: 'success',
                        text: res.data.msg
                    })
                },
                (err) => {
                    console.log("failed");
                    console.log(err);
                    this.setState({errors: err.response.data.errors, isLoading: false})
                }
            )
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <p className="white-center">Fill this form to activate your account bitch!</p>
                <p className="white-center">Personal Information</p>

                <UserDetails
                    onChange={this.onChange}
                    onDobUpdate={this.onDobUpdate}
                    state={this.state}/>
                <br/>

                <p className="white-center">Gym Details</p>
                <TextFieldGroup
                    error={errors.gym_name}
                    label="Gym Name"
                    onChange={this.onChange}
                    value={this.state.gym_name}
                    field="gym_name"
                />

                <Address onChange={this.onChange} state={this.state}/>

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

Activate.propTypes = {
    // params: React.PropTypes.const.isRequired,
    activateManagerRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
};

export default Activate;