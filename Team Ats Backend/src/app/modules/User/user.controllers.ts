import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import UserServices from './user.services';

const registerUser: RequestHandler = catchAsync(async (req, res) => {
	const result = await UserServices.registerUser(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Account registered successfully! Please wait for admin approval.',
		data: result
	});
});

const changeUserStatus: RequestHandler = catchAsync(async (req, res) => {
	const { id, status } = req.params;
	const result = await UserServices.changeUserStatus(id, status);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: `User status updated to ${status} successfully!`,
		data: result
	});
});

const getUser: RequestHandler = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await UserServices.getUser(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User retrieved successfully!',
		data: result
	});
});

const getUsers: RequestHandler = catchAsync(async (req, res) => {
	const result = await UserServices.getUsers(req.query);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Users retrieved successfully!',
		data: result
	});
});

const updateUser: RequestHandler = catchAsync(async (req, res) => {
	const userId = req?.userData?._id;
	if (!userId) {
		throw new Error('Unauthorized access - user ID missing!');
	}
	if (typeof userId !== 'string') {
		throw new Error('Invalid user ID type');
	}

	const result = await UserServices.updateUser(userId, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User updated successfully!',
		data: result
	});
});

const deleteUser: RequestHandler = catchAsync(async (req, res) => {
	const { id } = req.params;
	const result = await UserServices.deleteUser(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User deleted successfully!',
		data: result
	});
});

const UserControllers = {
	registerUser,
	changeUserStatus,
	getUser,
	getUsers,
	updateUser,
	deleteUser
};

export default UserControllers;
