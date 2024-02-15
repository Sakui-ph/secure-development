import { query, body, checkSchema, check } from "express-validator";
import { AlphaLocale } from "express-validator/src/options";
import path from "path";

export const checkEmail = check('email').isEmail().withMessage('Invalid email');

export const customValidators = {
    isImage: (value : any, filename : string) : any => {
        var extension = (path.extname(filename)).toLowerCase();
        switch (extension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case  '.png':
                return '.png';
            default:
                return false;
        }
    }
}

export const validateProfilePicture = body('profile_picture').custom((value, {req}) => {
    if (req.file === undefined) {
        return false;
    }
    return customValidators.isImage(value, req.file.originalname);
})

export const checkUser = checkSchema({
    email: {
        in: ['query', 'body'],
        trim: true,
        isEmail: {
            errorMessage: 'Invalid email'
        },
    },
    password: {
        in: ['body'],
        isLength: {
            options: {min: 8},
            errorMessage: 'Password must be at least 8 characters long'
        }
    },
    phone_number: {
        in: ['body'],
        trim: true,
        matches: {
            options: /^(09|\+639)\d{9}$/,
            errorMessage: 'Invalid phone number'
        }
    },
    first_name: {
        in: ['body'],
        trim: true,
    },
    last_name: {
        in: ['body'],
        trim : true,
    },
},
)