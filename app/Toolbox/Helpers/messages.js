export const message={
    //validation errors
    "required":"This field is required",
    "invalidEmail": "Invalid email",
    "invalidMobile":"Invalid mobile number",
    "notAlpha":"Input should only consist of alphabets",
    "passwordNotMatch":"Password doesn't match",
    "invalidDate":"Not a valid date",

    //non-validation errors
    "badConnection":"unable to connect",
    "errorAtServer":"Some error occurred at the server"
};

export function exceededMaxLength(length) {
    return "length cannot be more than "+length+" characters";
}

export function notEnoughLength(length) {
    return "length should be at least "+length+" characters";
}