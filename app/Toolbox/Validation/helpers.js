import {validate} from "./validator"

/** Takes complete state and only filter out personal variables and validate those
 *  @param data => object with fields {first_name,middle_name,last_name,dob,gender,password,password_confirm}
 *  @return object => {object,bool} array of errors and isValid
 * */
export function validatePersonalDetails(data) {
    const {first_name, middle_name, last_name, dob, gender, password, password_confirm} = data;
    const {errors, isValid} = validate({
        first_name: [first_name, 'isRequired', 'isAlpha', 'max(15)', 'min(3)'],
        middle_name: [middle_name, 'isAlpha'],
        last_name: [last_name, 'isRequired', 'isAlpha', 'max(10)', 'min(2)'],
        dob: [dob, 'isRequired', 'isDate'],
        gender: [gender, 'isRequired', 'min(1)', 'max(1)'],
        password: [password, 'isRequired', 'min(6)', 'max(25)'],
        password_confirm: [password_confirm, 'isRequired', 'min(6)', 'max(25)', `passwordMatch('${password}')`],
    });
    return {errors, isValid}
}

/** Takes complete state and only filter out address variables and validate those
 *  @param data => object with fields {street_address,locality,district,pin,state,country}
 *  @return object => {object,bool} array of errors and isValid
 * */
export function validateGymDetails(data) {
    const {gym_name,street_address, locality, district, pin, state, country} = data;
    const {errors,isValid}=validate({
        gym_name:[gym_name,'isRequired','isAlpha','max(15)','min(3)'],
        street_address: [street_address, 'max(40)'],
        locality: [locality, 'isRequired', 'isAlpha', 'max(30)', 'min(2)'],
        district:[district,'isRequired','isAlpha', 'max(30)', 'min(2)'],
        pin:[pin,'isRequired','isNumber','min(4)','max(8)'],
        state: [state, 'isRequired','isAlpha', 'max(30)', 'min(2)'],
        country: [country,'isRequired','isAlpha', 'max(30)', 'min(2)'],
    });
    return {errors,isValid}
}

export function validateOTP(data) {
    const {otp} = data;
    const {errors, isValid} = validate({
        otp: [otp, 'isRequired','min(5)','max(6)'],
    });
    return {
        errors,
        isValid
    }
}


export function validateLogin(data) {
    const {identifier, password} = data;
    const {errors, isValid} = validate({
        identifier: [identifier, 'isRequired'],
        password: [password, 'isRequired']
    });
    return {
        errors,
        isValid
    }
}


export function validateUserRegistrationFields(data) {
    const {nick_name, email, mobile, country_code, isMobileValid} = data;
    const {errors, isValid} = validate({
        nick_name: [nick_name, 'isRequired', 'isAlpha', 'max(15)', 'min(3)'],
        email: [email, 'isRequired', 'isEmail', 'max(30)'],
        mobile: [mobile, 'isRequired', `isMobile('${isMobileValid}')`],
        country_code: [country_code, 'isRequired']
    });
    return {
        errors,
        isValid
    }
}

export function validateEmail(data) {
    const {email} = data;
    const {errors, isValid} = validate({
        email: [email, 'isRequired', 'isEmail', 'max(30)'],
    });
    return {
        errors,
        isValid
    }
}

export function validatePassword(data) {
    const {password, password_confirm} = data;
    const {errors, isValid} = validate({
        password: [password, 'isRequired', 'min(6)', 'max(25)'],
        password_confirm: [password_confirm, 'isRequired', 'min(6)', 'max(25)', `passwordMatch('${password}')`],

    });
    return {
        errors,
        isValid
    }
}