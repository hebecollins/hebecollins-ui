import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {exceededMaxLength, message, notEnoughLength} from '../Helpers/messages';

/** Validate takes array of field, value and property and validate values against the properties
 *  =================================================================================
 *  array = {
 *           field1 :[value1, property1, property2],
 *           field2:[value2,property1,property2,property3]
 *          }
 *  =================================================================================
 *  @param array =>array as described above
 *  @return {object,boolean}=>{(key,error),true/false}. IF there error field is empty, isValid will be true ELSE false
 *  */
export function validate(array) {
    const errors={};
    Object.keys(array).forEach(function (field) {
        const value = array[field][0]+'';

        //adding '' after array[field][0] will make it a string. npm Validator only validates string
        array[field].shift();
        array[field].every(property => {
            const error = getValidationForProperty(value, property);
            if (error !== undefined) {
                errors[field] = error;
                return false
            }
            return true
        });
    });
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

/** eval is converting string into function call
 * @param value => value, which has to be validated
 * @param property => property against which value will be validated
 * @return object => error msg from helper functions
 * */
function getValidationForProperty(value, property) {
    if (property.indexOf('(') > -1) {

        /*
        * for eg. property = someFunction(arg1)
        * it will be converted into someFunction(arg1,value)
        **/
        const functionWithArgument = property.replace(')', ',' + '\'' + value + '\'' + ')');
        return eval(functionWithArgument);
    }
    //coverts it into eval('property(value)') which is equivalent of calling property function
    return eval(property + '(' + '\'' + value + '\'' + ')');
}

function isRequired(value) {
    if (Validator.isNull(value)) {
        return message.required;
    }
}
function max(maxLength, value) {
    if (!Validator.isLength(value,0,maxLength)) {
        return exceededMaxLength(maxLength);
    }
}

function min(minLength, value) {
    if (!Validator.isLength(value, minLength, 100)) {
        return notEnoughLength(minLength);
    }
}

function isEmail(value) {
    if (!Validator.isEmail(value)) {
        return message.invalidEmail;
    }
}

function isAlpha(value) {
    if(!Validator.isNull(value)){
        if (!Validator.isAlpha(value)) {
            return message.notAlpha;
        }
    }

}

function passwordMatch(password,passwordConfirm) {
    if (!Validator.equals(password,passwordConfirm)) {
        return message.passwordNotMatch;
    }
}

function isDate(value) {
    if (!Validator.isISO8601(value)) {
        return message.invalidDate;
    }
}
