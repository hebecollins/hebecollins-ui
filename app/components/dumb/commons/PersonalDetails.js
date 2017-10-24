import React from 'react';
import {TextField, Date, Select} from './inputField/InputFieldWithIcon'

/**Fields:  *First Name      *Middle Name(Optional)     *Last Name
 *          *Date of Birth   *Gender
 *          *Password        *Confirm Password
 * */
export const UserDetails = (props) => {
    const {errors, first_name, middle_name, last_name, dob, gender, password, password_confirm}
        = props.state;

    const {onChange, onDobUpdate} = props;

    return (
        <div>
            <TextField
                error={errors.first_name}
                label="First Name"
                onChange={onChange}
                value={first_name}
                iconClass="glyphicon glyphicon-user"
                field="first_name"
            />

            <TextField
                error={errors.middle_name}
                label="Middle Name(Optional)"
                onChange={onChange}
                value={middle_name}
                iconClass="glyphicon glyphicon-user"
                field="middle_name"
            />

            <TextField
                error={errors.last_name}
                label="Last Name"
                onChange={onChange}
                value={last_name}
                iconClass="glyphicon glyphicon-user"
                field="last_name"
            />

            <Date
                label="date of birth(yyyy-MM-dd)"
                value={dob}
                error={errors.dob}
                onDateUpdate={onDobUpdate}
            />

            <Select
                field="gender"
                label="Gender"
                error={errors.gender}
                onChange={onChange}
            >
                <option value='m'>Male</option>
                <option value='f'>Female</option>
                <option value='o'>Others</option>
            </Select>

            <TextField
                error={errors.password}
                label="Password"
                onChange={onChange}
                value={password}
                field="password"
                iconClass="fa fa-key"
                type="password"
            />

            <TextField
                error={errors.password_confirm}
                label="Confirm Password"
                onChange={onChange}
                value={password_confirm}
                field="password_confirm"
                iconClass="fa fa-key"
                type="password"
            />
        </div>
    );
};

UserDetails.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    state: React.PropTypes.object.isRequired
};
