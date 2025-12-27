const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Op } = require('sequelize');
const config = require('../config/config');
const { PasswordResetToken } = require('../models');
const { tokenTypes } = require('../config/tokens');
const TokenDao = require('../dao/TokenDao');

class TokenService {
    constructor() {
        this.tokenDao = new TokenDao();
    }
    generateToken = (userId, expires = moment().add(1, 'hour'), type = "access", secret = config.jwt.secret) => {
        const payload = {
            sub: userId,
            iat: moment().unix(),
            exp: expires.unix(),
            type,
        };
        return jwt.sign(payload, secret);
    };

    saveToken = async (token, userId, expires, type) => {
        return this.tokenDao.create({
            token,
            user_id: userId,
            expires_at: expires.toDate(),
            type,
        });
    };

    /**
     * Verify JWT token and ensure it exists in DB
     * @param {string} token
     * @returns {Object} token record
     */
    verifyToken = async (token) => {
        const payload = jwt.verify(token, config.jwt.secret);
        if (!payload || !payload.sub) {
            throw new Error('Token not valid');
        }

        const tokenDoc = await PasswordResetToken.findOne({
            where: {
                token,
                user_id: payload.sub,
                used_at: null,
                expires_at: { [Op.gt]: moment() },
            },
        });

        if (!tokenDoc) {
            throw new Error('Token not found or expired');
        }

        return tokenDoc;
    };

    markTokenUsed = async (token) => {
        return PasswordResetToken.update(
            { used_at: moment().toDate() },
            { where: { token } }
        );
    };

    generatePasswordResetToken = async (user, expiresAt = moment().add(1, 'hour')) => {
        const resetToken = this.generateToken(user.id, expiresAt);
        await this.saveToken(user.id, resetToken, expiresAt);
        return resetToken;
    };

    removeExpiredTokens = async () => {
        await PasswordResetToken.destroy({
            where: {
                expires_at: { [Op.lt]: moment() },
            },
        });
    };

    generateAuthTokens = async (user) => {
        const accessExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
        const refreshExpires = moment().add(config.jwt.refreshExpirationDays, 'days');

        const accessToken = this.generateToken(user.id, accessExpires, tokenTypes.ACCESS);
        const refreshToken = this.generateToken(user.id, refreshExpires, tokenTypes.REFRESH);

        await this.saveToken(accessToken, user.id, accessExpires, tokenTypes.ACCESS);
        await this.saveToken(refreshToken, user.id, refreshExpires, tokenTypes.REFRESH);

        // cleanup old tokens
        await this.tokenDao.deleteExpired(tokenTypes.ACCESS);
        await this.tokenDao.deleteExpired(tokenTypes.REFRESH);

        return {
            access: {
                token: accessToken,
                expires: accessExpires.toDate(),
            },
            refresh: {
                token: refreshToken,
                expires: refreshExpires.toDate(),
            },
        };
    };

}

module.exports = TokenService;
