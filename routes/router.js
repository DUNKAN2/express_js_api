import { Router } from 'express'
import { getRoot, getUsers, getUserById, postUser, updateUser, deleteUser } from '../db/db.js'

const router = Router();

router.get('/', getRoot);

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users', postUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

export default router