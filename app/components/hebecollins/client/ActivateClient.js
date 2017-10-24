import React from 'react';
import {validatePersonalDetails, validateGymDetails} from "../../../Toolbox/Validation/helpers";
import {connect} from 'react-redux';
import {UserDetails} from '../../dumb/commons/inputFieldGroup/PersonalDetails';
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {FormatForm} from "../../dumb/commons/templates/FormatForm"
import SingleScreen from "./../../dumb/commons/templates/SingleScreen";
import {activateClient} from "../../../actions/manager/activate"

class ActivateClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            middle_name: '',
            last_name: '',
            dob: '',
            gender: '',
            password: '',
            password_confirm: '',
            errors: {},
            isNext: false,
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDobUpdate = this.onDobUpdate.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    /*For date update, as DateTime library does not have a attribute name*/
    onDobUpdate(dob) {
        this.state.dob = dob.format("YYYY-MM-DD")
    }

    isValid() {
        const {errors, isValid} = validatePersonalDetails(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.activateClient(this.state, this.props.location.query).catch(
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
            <div className="content">
                <SingleScreen>
                    <FormatForm
                        instruction="Tell us about you"
                        isLoading={this.state.isLoading}
                        iconClass="fa fa-id-card"
                        onSubmit={this.onSubmit}
                    >
                        <UserDetails
                            onChange={this.onChange}
                            onDobUpdate={this.onDobUpdate}
                            state={this.state}/>
                    </FormatForm>
                </SingleScreen>
            </div>
        );
    }
}

export default connect(null,{activateClient})(ActivateClient);
