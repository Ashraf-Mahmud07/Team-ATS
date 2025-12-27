const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Define associations here
            // For example: User.hasOne(models.UserProfile, { foreignKey: 'user_id', as: 'profile' });
            User.hasOne(models.UserProfile, { foreignKey: 'user_id', as: 'profile' });
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: 'user',
            },
            email_verified_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            last_login_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            underscored: true,
            timestamps: false,
        },
    );

    return User;
};
