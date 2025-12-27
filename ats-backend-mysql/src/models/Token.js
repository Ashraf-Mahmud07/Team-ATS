const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        static associate(models) {
            Token.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
            });
        }
    }

    Token.init(
        {
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            token: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM('access', 'refresh'),
                allowNull: false,
            },
            expires_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            blacklisted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Token',
            tableName: 'tokens',
            underscored: true,
        },
    );

    return Token;
};
