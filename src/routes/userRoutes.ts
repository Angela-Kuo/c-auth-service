import express from 'express';
import {
  getUsers,
  getUserById,
  getUserOperations,
  createUser,
  updateUser,
  deleteUser,
  modifyUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);

router.get('/:uid/operations', getUserOperations);
router.get('/:uid', getUserById);

router.post('/', createUser);
router.patch('/:uid', updateUser);
router.delete('/:uid', deleteUser);

router.put('/:uid', modifyUser);

export default router;