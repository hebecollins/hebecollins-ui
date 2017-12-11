import React from 'react';
import {TextField} from '../../others/inputField/InputFieldWithIconAddOn'
import { validateGymDetails} from "../../../Toolbox/Validation/helpers";
import {connect} from 'react-redux';
import {Address} from '../../others/inputFieldGroup/Address';
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {FormatForm} from "../../others/frames/FormatForm"
import SingleScreen from "../../others/frames/SingleScreen";
import {addGymToServer} from "../../../actions/gymActions";
import {redirectByName} from "../../../Toolbox/Helpers/redirect";

class AddGym extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gym_name: '',
            street_address: '',
            locality: '',
            district: '',
            pin: '',
            state: '',
            country: '',
            errors: {},
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    isValid() {
        const {errors, isValid} = validateGymDetails(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.addGymToServer(this.state).then(res=>{
                    redirectByName("MANAGER_HOME")
                }
            ).catch(
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
                        <div>
                            <FormatForm
                                onSubmit={this.onSubmit}
                                instruction="Gym Address"
                                iconClass="glyphicon glyphicon-map-marker"
                                isLoading={this.state.isLoading}
                                enableImage={false}
                                backButton={true}
                                onBackButtonClick={this.onBack}>

                                <TextField
                                    error={errors.gym_name}
                                    label="Gym Name"
                                    onChange={this.onChange}
                                    value={this.state.gym_name}
                                    field="gym_name"/>

                                <Address onChange={this.onChange} state={this.state}/>
                            </FormatForm>
                            <br/>
                        </div>
                </SingleScreen>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.verificationData.userId
    }
}

export default connect(mapStateToProps, {addGymToServer})(AddGym);