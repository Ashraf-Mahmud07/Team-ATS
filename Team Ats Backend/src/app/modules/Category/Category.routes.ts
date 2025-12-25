import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import CategoryControllers from './Category.controllers';
import CategoryValidations from './Category.validations';

const router = express.Router();

router.post('/create', validateRequest(CategoryValidations.createCategoryValidation), CategoryControllers.createCategory);

router.get('/all', CategoryControllers.getCategoryList);

router.get('/:id', CategoryControllers.getSingleCategory);

router.put(
    '/:id',
    validateRequest(CategoryValidations.updateCategoryValidation),
    CategoryControllers.updateCategory
);

router.delete('/:id', CategoryControllers.deleteCategory);

const CategoryRoutes = router;

export default CategoryRoutes;
