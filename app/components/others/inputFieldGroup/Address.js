import React from 'react';
import {TextField} from '../inputField/InputFieldWithIconAddOn';

/** Fields :    *Street Address(Optional)    *Locality
 *              *District                    *Pin
 *              *State                       *Country
 */
export const Address = (props) => {
    const {errors, street_address, locality, district, pin, state, country} = props.state;
    const onChange = props.onChange;
    return (
        <div>
            <TextField
                error={errors.street_address}
                label="Street Address(Optional)"
                onChange={onChange}
                value={street_address}
                field="street_address"
            />

            <TextField
                error={errors.locality}
                label="Locality"
                onChange={onChange}
                value={locality}
                field="locality"
            />

            <TextField
                error={errors.district}
                label="District"
                onChange={onChange}
                value={district}
                field="district"
            />

            <TextField
                error={errors.pin}
                label="Pin Code"
                onChange={onChange}
                value={pin}
                field="pin"
            />

            <TextField
                error={errors.state}
                label="State"
                onChange={onChange}
                value={state}
                field="state"
            />

            <TextField
                error={errors.country}
                label="Country"
                onChange={onChange}
                value={country}
                field="country"
            />
        </div>
    );
};

Address.propTypes = {
    state: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
};
