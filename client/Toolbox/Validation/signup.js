import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
    let errors={};

    if(Validator.isNull(data.nick_name)){
        errors.nick_name = 'this field is required'
    }
    if(Validator.isNull(data.email)){
        errors.email = 'this field is required'
    }

    if(!Validator.isNull(data.email)&&!Validator.isEmail(data.email)){
        errors.email = 'invalid email'
    }

    if(Validator.isNull(data.mobile)){
        errors.mobile = 'this fields is required'
    }

    if(!data.isMobileValid){
        errors.mobile = 'invalid no.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}