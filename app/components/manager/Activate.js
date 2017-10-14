import React from 'react';
import TextFieldGroup from '../dumbComponents/TextFieldGroup'
import validateInput from "../../Toolbox/Validation/category/userActivateForm";
import {browserHistory} from 'react-router';
import Address from '../dumbComponents/Address';
import UserDetails from '../dumbComponents/UserFormActivate';
import {errorResponse} from "../../Toolbox/Helpers/responseHandler";

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
                    browserHistory.push('/');
                    this.props.addFlashMessage({
                        type: 'success',
                        text: res.data.msg
                    })
                },
                (err) => {
                    const response = errorResponse(err);
                    this.setState({errors: response, isLoading: false})
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