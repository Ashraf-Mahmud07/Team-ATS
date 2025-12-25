/* eslint-disable no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TActivitiesCategory } from "./Category.interfaces";
import { Categories } from "./Category.model";

const createCategory = async (data: TActivitiesCategory) => {
    const newCategory = await Categories.create(data);
    return newCategory;
};

const getSingleCategory = async (id: string) => {
    const category = await Categories.findById(id);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, "Category not found");
    }
    return category;
};

const getCategoryList = async (searchQuery: Record<string, unknown>) => {
    const categoryList = await Categories.find().sort({ createdAt: -1 });
    return categoryList;
};

const updateCategory = async (id: string, data: TActivitiesCategory) => {
    const updatedCategory = await Categories.findByIdAndUpdate(id, data, { new: true });

    if (!updatedCategory) {
        throw new AppError(httpStatus.NOT_FOUND, "Category not found");
    }

    return updatedCategory;
};

const deleteCategory = async (id: string) => {
    const category = await Categories.findByIdAndDelete(id);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found or already deleted");
    }

    return category;
};

const CategoryServices = {
    deleteCategory,
    updateCategory,
    getCategoryList,
    getSingleCategory,
    createCategory
};

export default CategoryServices;
