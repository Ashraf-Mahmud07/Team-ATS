const SuperDao = require('./SuperDao');
const { Token } = require('../models');


class TokenDao extends SuperDao {
    constructor() {
        super(Token);
    }

    async findOne(where) {
        return Token.findOne({ where });
    }

    async remove(where) {
        return Token.destroy({ where });
    }

    async deleteExpired(type) {
        return Token.destroy({
            where: {
                type,
                expires_at: {
                    [require('sequelize').Op.lt]: new Date(),
                },
            },
        });
    }
}

module.exports = TokenDao;
