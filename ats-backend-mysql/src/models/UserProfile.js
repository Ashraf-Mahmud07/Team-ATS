const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserProfile extends Model {
        static associate(models) {
            // Define association with User
            UserProfile.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        }
    }

    UserProfile.init(
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
            present_address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            permanent_address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            district: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            upazila: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            profession: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            blood_group: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            date_of_birth: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            facebook_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            college: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            university: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            profile_image_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            is_available_for_donation: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            last_donation_date: {
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
            modelName: 'UserProfile',
            tableName: 'user_profiles',
            underscored: true,
            timestamps: false,
        }
    );

    return UserProfile;
};
