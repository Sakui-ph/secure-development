import {
    query,
    body,
    checkSchema,
    check,
    validationResult,
} from "express-validator";
import { Request, Response, NextFunction } from "express";
import path from "path";

const customValidators = {
    // check image hex / file sig
    isImage: (value: any, filename: string): any => {
        var extension = path.extname(filename).toLowerCase();
        switch (extension) {
            case ".jpg":
                return ".jpg";
            case ".jpeg":
                return ".jpeg";
            case ".png":
                return ".png";  
            default:
                return false;
        }
    },
};

const validateProfilePicture = body("profile_picture").custom(
    (value, { req }) => {
        if (req.file === undefined) {
            return false;
        }
        return customValidators.isImage(value, req.file.originalname);
    }
);

const validateEmail = check("email")
    .trim()
    .normalizeEmail()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    .matches(
        /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@[-A-Za-z0-9]+[.][-A-Za-z0-9]{2,}$/
    )
    .withMessage("Invalid email");

const checkUser = checkSchema({
    email: {
        in: ["body"],
        trim: true,
        normalizeEmail: true,
        escape: true,
        notEmpty: {
            errorMessage: "Email is required",
        },
        isEmail: {
            errorMessage: "Invalid email",
        },
        matches: {
            options: /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@[-A-Za-z0-9]+[.][-A-Za-z0-9]{2,}$/,
            errorMessage: "Invalid email",
        },
    },
    password: {
        in: ["body"],
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters long",
        },
    },
    phone_number: {
        in: ["body"],
        trim: true,
        matches: {
            options: /^(09|\+639)\d{9}$/,
            errorMessage: "Invalid phone number",
        },
    },
    first_name: {
        in: ["body"],
        trim: true,
        isAlpha: {
            errorMessage: "First name must only contain letters",
        }
    },
    last_name: {
        in: ["body"],
        trim: true,
        isAlpha: {
            errorMessage: "Last name must only contain letters",
        }
    },
    profile_picture: {
        in: ["body"],
        optional: true,
        custom: {
            options: (value, { req }) => {
                if (req.file === undefined) {
                    return false;
                }
                return customValidators.isImage(value, req.file.originalname);
            },
        },
    },
});

module.exports = {
    checkEmail: [
        validateEmail,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            console.log(`Email is valid as ${req.query.email}`);
            next();
        },
    ],
    checkUser: [
        checkUser,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors.array());
            }
            console.log(`User ${req.body.first_name}`);
            next();
        },
    ],
};

export default module.exports;
