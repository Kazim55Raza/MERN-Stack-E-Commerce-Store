import express from 'express';
const router = express.Router();
import { 
  createOrder, 
  getOrder, 
  getOrders, 
  updateOrderToPaid,
  getSellerOrders,
  updateOrderStatus 
} from '../controllers/orderController.js';
import { protect, seller } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createOrder).get(protect, getOrders);
router.route('/:id').get(protect, getOrder);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/seller/orders').get(protect, seller, getSellerOrders);
router.route('/:id/status').put(protect, seller, updateOrderStatus);

export default router;
