import React from 'react';
import {TextField, MobileNumber} from '../inputField/InputFieldWithIcon';

export const AddUser=(props)=>{

        const {errors,nick_name,email,mobile} = props.state;
        return (
            <div>
                <TextField
                    error={errors.nick_name}
                    label="Nick Name"
                    onChange={props.onChange}
                    value={nick_name}
                    iconClass="glyphicon glyphicon-user"
                    field="nick_name"
                />

                <TextField
                    error={errors.email}
                    label="Email"
                    onChange={props.onChange}
                    value={email}
                    iconClass="glyphicon glyphicon-envelope"
                    field="email"
                />

                <MobileNumber
                    label="Mobile Number"
                    field="mobile"
                    value={mobile}
                    handleMobileNo={props.handleMobileNo}
                    error={errors.mobile}
                />
            </div>
        );
    };

AddUser.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    handleMobileNo: React.PropTypes.func.isRequired,
    state: React.PropTypes.object.isRequired
};
