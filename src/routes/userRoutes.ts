import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:uid', getUserById);
router.post('/', createUser);
router.patch('/:uid', updateUser);
router.delete('/:uid', deleteUser);

export default router;