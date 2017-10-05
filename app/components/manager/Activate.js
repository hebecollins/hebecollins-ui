import React from 'react';
import TextFieldGroup from './../common/TextFieldGroup'
import validateInput from "../../Toolbox/Validation/category/activate";
import {browserHistory} from 'react-router';

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
        console.log(errors);
        return isValid;
    }

    handleMobileNo(status, value, countryData, number) {
        console.log(countryData);
        this.setState({mobile: value, country_code: countryData.dialCode, isMobileValid: status})
    }

    onSubmit(e) {

        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});//setting state to empty
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
                <div className="col col-lg-4 col-md-4">
                    <TextFieldGroup error={errors.first_name} label="First Name" onChange={this.onChange}
                                    value={this.state.first_name} field="first_name"
                    />
                </div>
                <div className="col col-lg-4">

                    <TextFieldGroup error={errors.middle_name} label="Middle Name(Optional)"
                                    onChange={this.onChange}
                                    value={this.state.middle_name} field="middle_name"
                    />
                </div>
                <div className="col col-lg-4">

                    <TextFieldGroup error={errors.last_name} label="Last Name" onChange={this.onChange}
                                    value={this.state.last_name} field="last_name"
                    />
                </div>
                <TextFieldGroup error={errors.dob} label="Date of Birth" onChange={this.onChange}
                                value={this.state.dob} field="dob" type="date"
                />

                <select className="select-hebecollins" onChange={this.onChange} name="gender">
                    <option defaultValue="" disabled selected hidden>Gender</option>
                    <option value='m'>Male</option>
                    <option value='f'>Female</option>
                    <option value='o'>Others</option>
                </select><br/><br/>


                <TextFieldGroup error={errors.gym_name} label="Gym Name" onChange={this.onChange}
                                value={this.state.gym_name} field="gym_name"
                />

                <TextFieldGroup error={errors.street_address} label="Street Address" onChange={this.onChange}
                                value={this.state.street_address} field="street_address"
                />

                <TextFieldGroup error={errors.locality} label="Locality" onChange={this.onChange}
                                value={this.state.locality} field="locality"
                />

                <TextFieldGroup error={errors.district} label="District" onChange={this.onChange}
                                value={this.state.district} field="district"
                />

                <TextFieldGroup error={errors.pin} label="Pin Code" onChange={this.onChange}
                                value={this.state.pin} field="pin"
                />

                <TextFieldGroup error={errors.state} label="State" onChange={this.onChange}
                                value={this.state.state} field="state"
                />

                <TextFieldGroup error={errors.country} label="Country*" onChange={this.onChange}
                                value={this.state.country} field="country"
                />

                <TextFieldGroup error={errors.password} label="Password*" onChange={this.onChange}
                                value={this.state.password} field="password" type="password"
                />

                <TextFieldGroup error={errors.password_confirm} label="Confirm Password" onChange={this.onChange}
                                value={this.state.password_confirm} field="password_confirm" type="password"
                />

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