import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersControlller = new UsersController();
const userAvatarControlller = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersControlller.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarControlller.update,
);

export default usersRouter;
