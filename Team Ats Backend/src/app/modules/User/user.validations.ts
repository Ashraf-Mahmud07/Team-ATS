import { z } from 'zod';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
// const passwordRegex = /^[a-zA-Z0-9]{8}$/;

const TPictureValidation = z.object({
	url: z.string().url({
		message: 'Invalid URL!'
	}),
	publicId: z.string({
		required_error: 'Public ID is required!'
	})
});

const TExamAttemptedValidation = z.object({
	examId: z.string({
		required_error: 'Exam ID is required!'
	}),
	score: z.number().min(0, {
		message: 'Score must be a non-negative number!'
	}),
	attemptDate: z.date({
		required_error: 'Attempt date is required!'
	})
});

const registerUserValidation = z.object({
	body: z.object({
		username: z.string().optional(),
		name: z.string().optional(),
		email: z
			.string({
				required_error: 'Email is required!'
			})
			.email({
				message: 'Invalid email address!'
			}),
		phone: z.string().optional(),
		password: z
			.string({
				required_error: 'Password is required!'
			}),
			// .refine((data) => passwordRegex.test(data), {
			// 	message: 'Password must contain at least 8 characters, 1 letter, 1 number!'
			// }),
		dateOfBirth: z.date().optional(),
		location: z.string().optional(),
		picture: TPictureValidation.optional(),
		packages: z.enum(['free', 'trial', 'paid']).optional(),
		examsAttempted: z.array(TExamAttemptedValidation).optional(),
		favorites: z.array(z.string()).optional(),
		status: z.enum(['active', 'blocked']).optional()
	})
});

const updateUserValidation = z.object({
	body: z.object({
		username: z
			.string()
			.min(3, {
				message: 'Username must be at least 3 characters long!'
			})
			.optional(),
		name: z
			.string()
			.min(3, {
				message: 'Name must be at least 3 characters long!'
			})
			.optional(),
		email: z
			.string()
			.email({
				message: 'Invalid email address!'
			})
			.optional(),
		phone: z.string().optional(),
		password: z
			.string()
			.refine((data) => passwordRegex.test(data), {
				message:
					'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character!'
			})
			.optional(),
		dateOfBirth: z.date().optional(),
		location: z.string().optional(),
		picture: TPictureValidation.optional(),
		packages: z.enum(['free', 'trial', 'paid']).optional(),
		examsAttempted: z.array(TExamAttemptedValidation).optional(),
		favorites: z.array(z.string()).optional(),
		status: z.enum(['active', 'blocked']).optional(),
		isDeleted: z.boolean().optional()
	})
});

const UserValidations = {
	registerUserValidation,
	updateUserValidation
};

export default UserValidations;
