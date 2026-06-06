import express from 'express';
import { registerUser, authUser, logout } from '../controllers/userController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/logout', logout);

export default router;