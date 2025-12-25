import express from 'express';
import SystemRoutes from '../modules/system/system.routes';
import UserRoutes from '../modules/User/user.routes';
import AdminRoutes from '../modules/Admin/admin.routes';
import CategoryRoutes from '../modules/Category/Category.routes';

const router = express.Router();

const moduleRoutes = [
	{
		path: '/system',
		route: SystemRoutes
	},
	{
		path: '/users',
		route: UserRoutes
	},
	{
		path: '/admin',
		route: AdminRoutes
	},
	{
		path: '/categories',
		route: CategoryRoutes
	}
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
