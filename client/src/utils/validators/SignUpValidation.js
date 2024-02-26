export const SignUpValidation = (inputFields) => {
    const errors = {};
    if (!inputFields.first_name) {
        errors.first_name = 'First Name is required';
    }
    if (!inputFields.last_name) {
        errors.last_name = 'Last Name is required';
    }
    if (!inputFields.email) {
        errors.email = 'Email is required';
    }
    if (!inputFields.password) {
        errors.password = 'Password is required';
    }
    if (!inputFields.phone_number) {
        errors.phone_number = 'Phone Number is required';
    }
    return errors;
};

function validateFirstName(first_name) {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(first_name);
}
