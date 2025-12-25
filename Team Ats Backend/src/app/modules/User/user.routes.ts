import express from 'express';
import AuthGuard from '../../middlewares/AuthGuard';
import validateRequest from '../../middlewares/validateRequest';
import UserControllers from './user.controllers';
import UserValidations from './user.validations';

const router = express.Router();

router.post('/register', validateRequest(UserValidations.registerUserValidation), UserControllers.registerUser);

router.get('/', UserControllers.getUsers);

router.get('/:id', AuthGuard('admin', 'user'), UserControllers.getUser);

router.put(
	'/:id',
	AuthGuard('user'),
	validateRequest(UserValidations.updateUserValidation),
	UserControllers.updateUser
);

router.delete('/:id', AuthGuard('admin'), UserControllers.deleteUser);

const UserRoutes = router;

export default UserRoutes;
