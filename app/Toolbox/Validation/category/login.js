import {isRequired} from '../helpers'
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    const errors = isRequired(data);
    const isValid= isEmpty(errors)

    return {
        errors,
        isValid
    }
}