import express from 'express';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

function validateInput(data){
    let errors={};

    if(Validator.isNull(data.username)){
        errors.username = 'this field is required'
    }
    if(Validator.isNull(data.email)){
        errors.email = 'this field is required'
    }
    if(Validator.isEmail(data.email)){
        errors.email = 'invalid email'
    }
    if(Validator.isNull(data.password)){
        errors.password = 'this fields is required'
    }
    if(Validator.isNull(data.passwordConfirm)){
        errors.passwordConfirm = 'this fields is required'
    }
    if(Validator.isNull(data.timezone)){
        errors.timezone = 'this fields is required'
    }
    if(!Validator.equals(data.password, data.passwordConfirm)){
        errors.passwordConfirm = 'password must match'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

router.post('/',(req, res)=>{
    const  {errors, isValid} = validateInput(req.body);

    if(!isValid){
        res.status(400).json(errors);
    }
});

export default router;