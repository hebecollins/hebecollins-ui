import {isRequired} from '../helpers'

export default function validateInput(data) {
    const {errors, isValid} = isRequired(data);
    return {errors, isValid}
}