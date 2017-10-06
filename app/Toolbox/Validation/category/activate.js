import {isRequired} from '../helpers'

export default function validateInput(data) {
    let {errors, isValid} = isRequired(data, ['middle_name','street_address']);
    return {errors, isValid}
}