export const SignUpValidation = (inputFields) => {
    const errors = {};
    errors.first_name = validateName(inputFields.first_name);
    errors.last_name = validateName(inputFields.last_name);
    errors.email = validateEmail(inputFields.email);
    errors.password = validatePassword(inputFields.password);
    errors.phone_number = validatePhoneNumber(inputFields.phone_number);
    errors.profile_picture = validateProfilePicture(
        inputFields.profile_picture,
    );
    console.log(errors);
    // remove null or undefined errors
    Object.keys(errors).forEach((key) => {
        if (errors[key] === null || errors[key] === undefined) {
            delete errors[key];
        }
    });
    return errors;
};

function validateName(name) {
    const regex = /^[A-Za-z\s]+$/;

    if (name === '') return 'Name is required';

    if (!regex.test(name)) return 'Please use characters and spaces only';

    if (name.length > 50)
        return 'First Name must be at least 50 characters long';

    return null;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') return 'Email is required';

    if (!regex.test(email)) return 'Please enter a valid email address';

    if (email.length > 80) return 'Email must be at least 80 characters long';

    return null;
}

function validatePhoneNumber(phone_number) {
    const regex = /^(\+?63|0)9\d{9}$/;

    if (phone_number === '') return 'Phone Number is required';

    if (!regex.test(phone_number))
        return 'Please enter a valid phone number (Philippines, no dashes)';

    return null;
}

// TODO: Add validation for more password stuff like special chars and numbers
function validatePassword(password) {
    if (password === '') return 'Password is required';

    if (password.length < 8)
        return 'Password must be at least 8 characters long';

    return null;
}

function validateProfilePicture(profile_picture) {
    if (profile_picture === null) return 'Profile Picture is required';

    return null;
}
