import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc    Create a new order
// @route   POST /api/orders
export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    // Get product info and calculate total
    let totalPrice = 0;
    for (let item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404);
        throw new Error(`Product ${item.product} not found`);
      }
      item.price = product.price;
      totalPrice += product.price * item.qty;
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by id
// @route   GET /api/orders/:id
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.seller', 'name email');

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    // Check if user is the order owner or seller
    const isSeller = order.orderItems.some(item => item.seller._id.equals(req.user._id));
    if (!order.user._id.equals(req.user._id) && !isSeller && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to view this order');
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('orderItems.seller', 'name');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
export const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    // Check if user is the order owner
    if (!order.user.equals(req.user._id)) {
      res.status(401);
      throw new Error('Not authorized');
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Get seller's orders
// @route   GET /api/orders/seller/orders
export const getSellerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ 'orderItems.seller': req.user._id })
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (seller only)
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    // Check if user is the seller
    const isSeller = order.orderItems.some(item => item.seller.equals(req.user._id));
    if (!isSeller) {
      res.status(401);
      throw new Error('Not authorized');
    }

    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc    Alias for backward compatibility
export const addOrderItems = createOrder;