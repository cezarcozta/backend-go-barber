import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileControlller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileControlller.update);

profileRouter.get('/', profileControlller.show);

export default profileRouter;
