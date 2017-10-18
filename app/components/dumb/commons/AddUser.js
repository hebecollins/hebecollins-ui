import React from 'react';
import classnames from 'classnames';
import TextFieldGroup from './TextFieldGroup';

//for country code flag with mobile no.
import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!../../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import './../../../../node_modules/react-intl-tel-input/dist/main.css';

class AddUser extends React.Component {
    render() {
        const {errors} = this.props.state;
        return (
            <div>
                <TextFieldGroup
                    error={errors.nick_name}
                    label="Nick Name"
                    onChange={this.props.onChange}
                    value={this.props.state.nick_name}
                    iconClass="glyphicon glyphicon-user"
                    field="nick_name"
                />

                <TextFieldGroup
                    error={errors.email}
                    label="Email"
                    onChange={this.props.onChange}
                    value={this.props.state.email}
                    iconClass="glyphicon glyphicon-envelope"
                    field="email"
                />

                <div className={classnames("form-group", {'has-error': errors.mobile})}>
                    <div className="input-group">
                <span className="icon-text-field input-group-addon">
                    <i className="glyphicon glyphicon-phone"/>
                </span>
                        <IntlTelInput
                        fieldName={"mobile"}
                        value={this.props.state.mobile}
                        onPhoneNumberChange={this.props.handleMobileNo}
                        preferredCountries={['in']}
                        placeholder={'Mobile number'}
                        numberType="MOBILE"
                        style={{width: '100%'}}
                        css={['intl-tel-input', 'form-control']}
                        utilsScript={'libphonenumber.js'}
                        /></div>
                    {errors.mobile && <span className="help-block">{errors.mobile}</span>}
                </div>
            </div>
        );
    }
}

AddUser.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    handleMobileNo:React.PropTypes.func.isRequired,
    state:React.PropTypes.object.isRequired
};

export default AddUser;
