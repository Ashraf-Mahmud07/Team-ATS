import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import CategoryServices from './Category.services';

const createCategory: RequestHandler = catchAsync(async (req, res) => {
    const result = await CategoryServices.createCategory(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Account registered successfully! Please wait for admin approval.',
        data: result
    });
});

const getSingleCategory: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CategoryServices.getSingleCategory(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category retrieved successfully!',
        data: result
    });
});

const getCategoryList: RequestHandler = catchAsync(async (req, res) => {
    const result = await CategoryServices.getCategoryList(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category List retrieved successfully!',
        data: result
    });
});

const updateCategory: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new Error('Unauthorized access - user ID missing!');
    }
    if (typeof id !== 'string') {
        throw new Error('Invalid user ID type');
    }

    const result = await CategoryServices.updateCategory(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully!',
        data: result
    });
});

const deleteCategory: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CategoryServices.deleteCategory(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully!',
        data: result
    });
});

const CategoryControllers = {
    createCategory,
    getSingleCategory,
    getCategoryList,
    updateCategory,
    deleteCategory
};

export default CategoryControllers;
