import React from 'react';
import TextFieldGroup from '../../dumb/commons/TextFieldGroup'
import {validateOTP} from "../../../Toolbox/Validation/helpers";
import {connect} from 'react-redux';
import {errorResponse} from "../../../Toolbox/Helpers/responseHandler";
import {FormatForm} from "../../dumb/commons/templates/FormatForm"
import {sendOTP} from "../../../actions/guest/signUpActions"
import SingleScreen from "../../dumb/commons/templates/SingleScreen";

class Verify extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            otp: "",
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
        const {errors, isValid} = validateOTP(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});

            this.props.sendOTP(this.state, this.props.userId).catch(
                (err) => {
                    const response = errorResponse(err);
                    this.setState({errors: response, isLoading: false})
                }
            );
        }
    }

    render() {
        const {errors, otp, isLoading} = this.state;
        return (
            <div className="content">
                <SingleScreen>
                    <FormatForm
                        iconClass="fa fa-key"
                        onSubmit={this.onSubmit}
                        instruction="Enter Your 5 digit OTP"
                        isLoading={isLoading}>
                        <TextFieldGroup
                            field="otp"
                            label="One Time Password"
                            value={otp}
                            onChange={this.onChange}
                            error={errors.otp}
                        />
                    </FormatForm>
                </SingleScreen>
            </div>
        )
    }
}

Verify.propTypes = {
    sendOTP: React.PropTypes.func.isRequired,
    userId: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        userId: state.verificationData.userId
    }

}

export default connect(mapStateToProps, {sendOTP})(Verify);