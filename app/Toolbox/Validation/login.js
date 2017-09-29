import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
    let errors={};

    if(Validator.isNull(data.identifier)){
        errors.identifier = 'this field is required'
    }
    if(Validator.isNull(data.password)){
        errors.password = 'this field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}