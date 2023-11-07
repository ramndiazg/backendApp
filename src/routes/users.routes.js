import {Router} from 'express';
import * as usersCtrl from '../controllers/users.controller';
import {authJwt} from '../middlewares';
const router = Router();

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], usersCtrl.createUser);
router.get('/', [authJwt.verifyToken, authJwt.isModerator], usersCtrl.getUsers);
router.get('/:userId', [authJwt.verifyToken, authJwt.isModerator], usersCtrl.getUserById);
router.put('/:userId', [authJwt.verifyToken, authJwt.isAdmin], usersCtrl.updateUserById);
router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], usersCtrl.deleteUserById);

export default router;