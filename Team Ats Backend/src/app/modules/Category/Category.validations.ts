import { z } from 'zod';

const createCategoryValidation = z.object({
    body: z.object({
        categoryBanner: z.string().optional(),
        categoryName: z.string(),
        description: z.string(),
    })
});

const updateCategoryValidation = z.object({
    body: z.object({
        categoryBanner: z.string().optional(),
        categoryName: z.string(),
        description: z.string(),
    })
});

const CategoryValidations = {
    createCategoryValidation,
    updateCategoryValidation
};

export default CategoryValidations;
