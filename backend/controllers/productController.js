import Product from '../models/productModel.js';

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    let filter = {};
// if (sellerId) {
//     query.seller = sellerId;
//   }
    if (category) filter.category = category;
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const products = await Product.find(filter).populate('seller', 'name email');
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name email');

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product (Sellers Only)
// @route   POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    console.log('BODY:', req.body); // Should show name, price, etc.
  console.log('FILE:', req.file); // Should show the image buffer details
  // ... rest of your code
    const { name, price, description, image, brand, category, countInStock } = req.body;

    // Validate required fields
    if (!name || !price || !description || !brand || !category) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }
    // 2. Prepare the image object
    // Check if req.file exists (Multer populated it)
    const imagee = req.file 
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype
        }
      : null; // Or handle a default buffer here

    const product = new Product({
      name,
      price,
      seller: req.user._id,
      // image: image || 'public/images/sample.jpg',
      image: imagee,
  //     {
  //   data: req.file.buffer, // Provided by Multer
  //   contentType: req.file.mimetype
  // },
      brand,
      category,
      countInStock: countInStock || 0,
      description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product (Sellers Only)
// @route   PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Check if user is the seller
    if (!product.seller.equals(req.user._id) && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to update this product');
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (image) product.image = image;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (countInStock !== undefined) product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product (Sellers Only)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Check if user is the seller
    if (!product.seller.equals(req.user._id) && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to delete this product');
    }

    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get seller's products
// @route   GET /api/products/seller/my-products
export const getSellerProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json(products);
  } catch (error) {
    next(error);
  }
};