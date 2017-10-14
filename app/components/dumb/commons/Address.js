import React from 'react';
import TextFieldGroup from '../TextFieldGroup';

/** Fields :    Street Address(Optional)
 *              Locality
 *              District
 *              Pin
 *              State
 *              Country
 */
class Address extends React.Component {

    render() {
        const {errors,street_address,locality,district,pin,state,country} = this.props.state;
        const onChange =this.props.onChange;
        return (
            <div>
                <TextFieldGroup
                    error={errors.street_address}
                    label="Street Address(Optional)"
                    onChange={onChange}
                    value={street_address}
                    field="street_address"
                />

                <TextFieldGroup
                    error={errors.locality}
                    label="Locality"
                    onChange={onChange}
                    value={locality}
                    field="locality"
                />

                <TextFieldGroup
                    error={errors.district}
                    label="District"
                    onChange={onChange}
                    value={district}
                    field="district"
                />

                <TextFieldGroup
                    error={errors.pin}
                    label="Pin Code"
                    onChange={onChange}
                    value={pin}
                    field="pin"
                />

                <TextFieldGroup
                    error={errors.state}
                    label="State"
                    onChange={onChange}
                    value={state}
                    field="state"
                />

                <TextFieldGroup
                    error={errors.country}
                    label="Country"
                    onChange={onChange}
                    value={country}
                    field="country"
                />
            </div>
        );
    }
}

Address.propTypes = {
    state: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
};

export default Address;