import express from 'express';
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);

export default router;