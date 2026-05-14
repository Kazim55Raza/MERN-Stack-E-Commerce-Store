import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
const router = express.Router();
import { 
  getProducts, 
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts 
} from '../controllers/productController.js';
import { protect, seller } from '../middleware/authMiddleware.js';

// router.route('/').get(getProducts).post(protect, seller, createProduct);
router.route('/').get(getProducts).post(protect, seller, upload.single('image'), createProduct);
router.route('/seller/my-products').get(protect, seller, getSellerProducts);
router.route('/:id').get(getProductById).put(protect, seller, updateProduct).delete(protect, seller, deleteProduct);

export default router;
