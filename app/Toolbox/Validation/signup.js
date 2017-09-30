import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {message} from './messages';

export default function validateInput(data){
    let errors={};

    if(Validator.isNull(data.nick_name)){
        errors.nick_name = message.required
    }

    if(Validator.isNull(data.email)){
        errors.email = message.required
    }

    if(!Validator.isNull(data.email)&&!Validator.isEmail(data.email)){
        errors.email = message.invalidEmail
    }

    if(Validator.isNull(data.mobile)){
        errors.mobile = message.required
    }

    if(!Validator.isNull(data.mobile)&&!data.isMobileValid){
        errors.mobile = message.invalidMobile
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}