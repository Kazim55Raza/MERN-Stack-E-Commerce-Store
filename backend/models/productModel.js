 import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Links the product to a specific Seller
  },
  name: { type: String, required: true },
  // image: { type: String, required: true },
  image: {
    data: Buffer,      // This stores the actual bits of the image
    contentType: String // This stores 'image/jpeg' or 'image/png'
  },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;