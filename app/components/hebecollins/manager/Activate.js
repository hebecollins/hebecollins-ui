import React from 'react';
import TextFieldGroup from '../../dumb/commons/TextFieldGroup'
import {validatePersonalDetails, validateGymDetails} from "../../../Toolbox/Validation/helpers";
import {connect} from 'react-redux';
import Address from '../../dumb/commons/Address';
import UserDetails from '../../dumb/commons/PersonalDetails';
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {FormatForm} from "../../dumb/commons/templates/FormatForm"
import {activateManagerRequest} from "../../../actions/manager/activate"
import SingleScreen from "./../../dumb/commons/templates/SingleScreen";


class Activate extends React.Component {
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
            gym_name: '',
            street_address: '',
            locality: '',
            district: '',
            pin: '',
            state: '',
            country: '',
            errors: {},
            isNext: false,
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onBack = this.onBack.bind(this);
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
        const {errors, isValid} = validateGymDetails(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            console.log(this.state);
            this.setState({errors: {}, isLoading: true});
            this.props.activateManagerRequest(this.state, this.props.userId).catch(
                (err) => {
                    const response = errorResponse(err);
                    this.setState({errors: response, isLoading: false})
                }
            )
        }
    }

    /*==================================================================================*/
    /** onNext and onBack is for switching between personal detail and gym detail window
     * IF(isNext === true) personal detail window
     * ELSE gym detail window
     * */
    onNext(e) {
        e.preventDefault();
        const {errors, isValid} = validatePersonalDetails(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        if (isValid) {
            this.setState({isNext: true})
        }
    }

    onBack(e) {
        e.preventDefault();
        this.setState({isNext: false})
    }

    /*===================================================================================*/

    /**For clearing up the errors after 15 seconds
     * */
    // componentDidMount() {
    //     let self = this;
    //     setTimeout(function () {
    //         self.setState({errors: {}});
    //     }, 15000);
    // }
    //
    // componentDidUpdate() {
    //     let self = this;
    //     setTimeout(function () {
    //         self.setState({errors: {}});
    //     }, 15000);
    // }


    render() {
        const {errors} = this.state;
        return (
            <div className="content">
                <SingleScreen>
                    {!this.state.isNext ? <FormatForm
                            instruction="Tell us about you"
                            isLoading={this.state.isLoading}
                            iconClass="fa fa-id-card"
                            submitButton={false}
                            nextButton={true}
                            onNextButtonClick={this.onNext}
                        >
                            <UserDetails
                                onChange={this.onChange}
                                onDobUpdate={this.onDobUpdate}
                                state={this.state}/>
                            <button className="btn-next btn-lg pull-right" onClick={this.onNext}>Next<span>&rarr;</span>
                            </button>
                        </FormatForm> :

                        <div>
                            <FormatForm
                                onSubmit={this.onSubmit}
                                instruction="Gym Address"
                                iconClass="glyphicon glyphicon-map-marker"
                                isLoading={this.state.isLoading}
                                enableImage={false}
                                backButton={true}
                                onBackButtonClick={this.onBack}
                            >

                                <TextFieldGroup
                                    error={errors.gym_name}
                                    label="Gym Name"
                                    onChange={this.onChange}
                                    value={this.state.gym_name}
                                    field="gym_name"/>

                                <Address onChange={this.onChange} state={this.state}/>
                            </FormatForm>
                            <br/>
                            <button className="btn-next btn-lg pull-left" onClick={this.onBack}><span>&larr;</span>Back
                            </button>
                        </div>
                    }
                </SingleScreen>
            </div>
        );
    }
}

Activate.propTypes = {
    activateManagerRequest: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        userId: state.verificationData.userId
    }
}

export default connect(mapStateToProps, {activateManagerRequest})(Activate);
