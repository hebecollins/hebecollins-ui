import React from 'react';
import TextFieldGroup from './../common/TextFieldGroup'
import DateTime from 'react-datetime';
import moment from 'moment';
import classnames from 'classnames';


require('./../../css/dateTime.css');

//TODO: design a proper validation architecture
class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.isValidDate = this.isValidDate.bind(this)
    }

    //can be changed to any valid date
    isValidDate(current) {
        let yesterday = DateTime.moment().subtract(1, 'day');
        return current.isBefore(yesterday);
    }

    render() {
        const {
            errors,
            first_name,
            middle_name,
            last_name,
            dob,
            gender,
            password,
            password_confirm
        } = this.props.state;

        const {onChange, onDobUpdate} = this.props

        return (
            <div>
                <TextFieldGroup
                    error={errors.first_name}
                    label="First Name"
                    onChange={onChange}
                    value={first_name}
                    field="first_name"
                />

                <TextFieldGroup
                    error={errors.middle_name}
                    label="Middle Name(Optional)"
                    onChange={onChange}
                    value={middle_name}
                    field="middle_name"
                />

                <TextFieldGroup
                    error={errors.last_name}
                    label="Last Name"
                    onChange={onChange}
                    value={last_name}
                    field="last_name"
                />

                <div className={classnames('form-group', {'has-error': errors.dob})}>
                <DateTime
                    closeOnSelect={true}
                    viewMode={'days'}
                    timeFormat={false}
                    defaultValue="Date of Birth(yyyy-MM-dd)"
                    isValidDate={this.isValidDate}
                    value={dob}
                    onChange={onDobUpdate}
                    name="dob"
                    dateFormat="YYYY-MM-DD"
                />  {errors.dob && <span className="help-block">{errors.dob}</span>}
                </div>

                <div className={classnames('form-group', {'has-error': errors.gender})}>
                <select
                    className="select-hebecollins"
                    onChange={onChange}
                    name="gender">
                    <option value="" disabled selected hidden>Select your Gender</option>
                    <option value='m'>Male</option>
                    <option value='f'>Female</option>
                    <option value='o'>Others</option>
                </select>
                    {errors.gender && <span className="help-block">{errors.gender}</span>}
                </div>

                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={onChange}
                    value={password}
                    field="password"
                    type="password"
                />

                <TextFieldGroup
                    error={errors.password_confirm}
                    label="Confirm Password"
                    onChange={onChange}
                    value={password_confirm}
                    field="password_confirm"
                    type="password"
                />
            </div>
        );
    }
}

UserDetails.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    state: React.PropTypes.object.isRequired
};

export default UserDetails;