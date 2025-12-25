import bcrypt from 'bcryptjs';
import { model, Schema } from 'mongoose';
import { TPicture, TUser, UserModel } from './user.interfaces';

const PictureSchema = new Schema<TPicture>(
	{
		url: {
			type: String,
			required: [true, 'Picture URL is required!']
		},
		publicId: {
			type: String,
			required: [true, 'Picture public ID is required!']
		}
	},
	{ _id: false }
);

const userSchema = new Schema<TUser, UserModel>(
	{
		name: {
			type: String,
			required: [true, 'Name is required!']
		},
		email: {
			type: String,
			required: [true, 'Email is required!'],
			unique: true
		},
		phone: {
			type: String
		},
		password: {
			type: String,
			required: [true, 'Password is required!'],
			select: false
		},
		isVerified: {
			type: Boolean,
			default: false
		},
		presentAddress: {
			type: String
		},
		profession: {
			type: String
		},
		permanentAddress: {
			type: String
		},
		bloodGroup: {
			type: String
		},
		 facebook: {
          type: String,
            default: "",
           },

		picture: PictureSchema,
		
	},
	{ timestamps: true }
);

// Pre-save hook for hashing the password
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

// Static methods
userSchema.statics.isUserExists = async function (id: string) {
	return this.findById(id).select('+password');
};

userSchema.statics.isPasswordMatched = async function (plainPassword: string, hashedPassword: string) {
	return bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.statics.findUserByEmail = async function (email: string) {
	return this.findOne({ email }).select('+password');
};

export const User = model<TUser, UserModel>('User', userSchema);
