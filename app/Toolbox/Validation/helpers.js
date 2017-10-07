import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {message} from './messages';

/**Purpose => to determine whether a field is non-empty or not
 * @param data => the state of the component
 * @param optionalFields => The fields which are not mandatory in the component input
 * @return {object,boolean}=>{(key,error),true/false}. IF there error field is empty, isValid will be true ELSE false
 * */
export function isRequired(data, optionalFields=[]){

    let errors={};
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (key !== 'errors' && key !== 'isLoading' && !optionalFields.includes(key) ) {
                if (Validator.isNull(data[key]+'')) {
                    errors[key] = message.required
                }
            }
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

/**Purpose => to determine whether a field is alpha or not
 * @param data => the state of the component
 * @param optionalFields => The fields which are not mandatory in the component input
 * @return {object,boolean}=>{(key,error),true/false}. IF there error field is empty, isValid will be true ELSE false
 * */
export function isAlpha(data, optionalFields=[]){

    console.log(optionalFields);
    let errors={};
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (key !== 'errors' && key !== 'isLoading' && !optionalFields.includes(key) ) {
                if (Validator.isAlpha(data[key]+'')) {
                    errors[key] = message.notAlpha
                }
            }
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}