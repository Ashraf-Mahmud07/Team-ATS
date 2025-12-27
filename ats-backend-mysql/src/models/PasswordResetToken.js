const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PasswordResetToken extends Model {
        static associate(models) {
            PasswordResetToken.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        }
    }

    PasswordResetToken.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expires_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            used_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'PasswordResetToken',
            tableName: 'password_reset_tokens',
            underscored: true,
            timestamps: false,
        },
    );

    return PasswordResetToken;
};
