import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {message} from './messages';

export default function validateInput(data){
    let errors={};

    if(Validator.isNull(data.identifier)){
        errors.identifier = message.required
    }
    if(Validator.isNull(data.password)){
        errors.password = message.required
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}