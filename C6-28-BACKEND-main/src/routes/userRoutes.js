import express from 'express';
const router = express.Router();
import * as UserRoute from '../controllers/userController.js';
import * as AuthRoute from '../controllers/authController.js';
import * as UserValidator from '../validators/authValidator.js';
import * as AuthMiddleware from '../middlewares/authMiddleware.js';

router.post('/createMember', UserRoute.createMember);

router.post('/login', UserValidator.validatorLoginUser, AuthRoute.login);
router.post(
  '/signup',
  UserRoute.uploadUserPhoto,
  UserValidator.validatorRegisterUser,
  AuthRoute.signUp
);
router.get('/logout', AuthRoute.getLogout);

router.get('/:id', AuthMiddleware.ensureAuth, UserRoute.getUser);
router.get(
  '/',
  AuthMiddleware.ensureAuth,
  AuthMiddleware.restrictTo('admin'),
  UserRoute.getAllUsers
);
router.delete('/:id', AuthMiddleware.ensureAuth, UserRoute.deleteUser);
router.patch(
  '/:id',
  AuthMiddleware.ensureAuth,
  UserRoute.uploadUserPhoto,
  UserRoute.updateUser
);

export default router;
