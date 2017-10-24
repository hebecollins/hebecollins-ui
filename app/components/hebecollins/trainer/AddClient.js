import React from 'react';
import SingleScreen from "../../dumb/commons/templates/SingleScreen";
import {AddUser} from "../../dumb/commons/inputFieldGroup/AddUser";
import {validateUserRegistrationFields} from "../../../Toolbox/Validation/helpers";
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {registerClient} from "../../../actions/guest/signUpActions";
import {connect} from "react-redux"
import isEmpty from 'lodash/isEmpty';


class AddClient extends React.Component {
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

    reset() {
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
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});//setting state to empty

            const {user} = this.props;

            if (!isEmpty(user)) {

                //TODO: change it to select from selected gym by the manager
                const gymId = user.gym_list[0].gym_id;

                registerClient(this.state, gymId).then(
                    (res) => {
                        this.reset();//resetting the state so that it gets ready to take  another input
                    },
                    (err) => {
                        const response = errorResponse(err);
                        this.setState({errors: response, isLoading: false})
                    }
                );
            }
        }
    }

    render() {
        return (
            <div className="content">
                <SingleScreen>
                    <p className="white-center">Add client under your supervision</p>
                    <AddUser
                        onChange={this.onChange}
                        handleMobileNo={this.handleMobileNo}
                        state={this.state}/>
                    <div className="form-group">
                        <button disabled={this.state.isLoading}
                                onClick={this.onSubmit}
                                className="btn btn-group-justified btn-hebecollins btn-lg">
                            Add
                        </button>
                    </div>
                </SingleScreen>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(AddClient);