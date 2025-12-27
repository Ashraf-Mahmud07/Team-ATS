const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models'); 
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { userConstant } = require('../config/constant');

class UserService {
    constructor() { }
    createUser = async (userBody) => {
        try {
            let message = 'Successfully Registered the account! Please Verify your email.';

            // Check if email already exists
            const existingUser = await User.findOne({ where: { email: userBody.email.toLowerCase() } });
            if (existingUser) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email already taken');
            }

            // Hash password
            const hashedPassword = bcrypt.hashSync(userBody.password, 8);

            // Create user
            const userData = await User.create({
                uuid: uuidv4(),
                email: userBody.email.toLowerCase(),
                phone: userBody.phone || null,
                password_hash: hashedPassword,
                name: userBody.name,
                is_verified: userConstant.EMAIL_VERIFIED_FALSE,
                is_active: userConstant.STATUS_ACTIVE,
                role: userBody.role || 'user',
            });

            if (!userData) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Registration Failed! Please Try again.');
            }

            const userJson = userData.toJSON();
            delete userJson.password_hash; // remove password from response

            return responseHandler.returnSuccess(httpStatus.CREATED, message, userJson);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    /**
     * Check if email exists
     * @param {String} email
     * @returns {Object}
     */
    isEmailExists = async (email) => {
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email not Found!!');
        }
        return responseHandler.returnSuccess(httpStatus.OK, 'Email found!');
    };

    /**
     * Get user by UUID
     * @param {String} uuid
     * @returns {Object}
     */
    getUserByUuid = async (uuid) => {
        const user = await User.findOne({ where: { uuid } });
        if (!user) return null;
        const userJson = user.toJSON();
        delete userJson.password_hash;
        return userJson;
    };

    /**
     * Change password
     * @param {Object} data
     * @param {String} uuid
     * @returns {Object}
     */
    changePassword = async (data, uuid) => {
        try {
            const user = await User.findOne({ where: { uuid } });
            if (!user) {
                return responseHandler.returnError(httpStatus.NOT_FOUND, 'User Not found!');
            }

            if (data.password !== data.confirm_password) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Confirm password not matched');
            }

            const isPasswordValid = await bcrypt.compare(data.old_password, user.password_hash);
            if (!isPasswordValid) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Wrong old Password!');
            }

            await User.update(
                { password_hash: bcrypt.hashSync(data.password, 8) },
                { where: { uuid } }
            );

            return responseHandler.returnSuccess(httpStatus.OK, 'Password updated Successfully!', {});
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Password Update Failed!');
        }
    };
}

module.exports = UserService;
