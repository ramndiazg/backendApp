import {Router} from 'express';
import * as usersCtrl from '../controllers/users.controller';
const router = Router();

router.post('/', usersCtrl.createUser);
router.get('/', usersCtrl.getUsers);
router.get('/:userId', usersCtrl.getUserById);
router.put('/:userId', usersCtrl.updateUserById);
router.delete('/:userId', usersCtrl.deleteUserById);

export default router;