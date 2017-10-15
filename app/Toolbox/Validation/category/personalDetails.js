import {validate} from "../validator"

export default function validateInput(data) {
    const {first_name, middle_name, last_name, dob, gender, password, password_confirm} = data;
    const {errors,isValid}=validate(
        {
            first_name:[first_name,'isRequired','isAlpha','max(15)','min(3)'],
            middle_name: [middle_name, 'isAlpha'],
            last_name: [last_name, 'isRequired', 'isAlpha', 'max(10)', 'min(2)'],
            dob:[dob,'isRequired','isDate'],
            gender:[gender,'isRequired','min(1)','max(1)'],
            password: [password, 'isRequired','min(6)','max(25)'],
            password_confirm: [password_confirm,'isRequired', 'min(6)','max(25)', `passwordMatch('${password}')`],
        });
    return {errors,isValid}
}