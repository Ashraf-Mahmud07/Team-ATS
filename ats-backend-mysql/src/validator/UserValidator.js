const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class UserValidator {
    async userCreateValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            name: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            password: Joi.string().min(6).required(),
            role: Joi.string().optional(),
        });

        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            const errorMessage = error.details.map((d) => d.message).join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.body = value;
            return next();
        }
    }

    async userLoginValidator(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });

        const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            const errorMessage = error.details.map((d) => d.message).join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.body = value;
            return next();
        }
    }

    async checkEmailValidator(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
        });

        const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            const errorMessage = error.details.map((d) => d.message).join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.body = value;
            return next();
        }
    }

    async changePasswordValidator(req, res, next) {
        const schema = Joi.object({
            old_password: Joi.string().required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.string().valid(Joi.ref('password')).required(),
        });

        const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            const errorMessage = error.details.map((d) => d.message).join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.body = value;
            return next();
        }
    }
}

module.exports = UserValidator;
