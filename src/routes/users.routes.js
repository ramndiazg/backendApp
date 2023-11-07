import {Router} from 'express';
import * as usersCtrl from '../controllers/users.controller';
import {verifyToken} from '../middlewares'
const router = Router();

router.post('/', verifyToken, usersCtrl.createUser);
router.get('/', verifyToken, usersCtrl.getUsers);
router.get('/:userId', verifyToken, usersCtrl.getUserById);
router.put('/:userId', verifyToken, usersCtrl.updateUserById);
router.delete('/:userId', verifyToken, usersCtrl.deleteUserById);

export default router;