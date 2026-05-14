# ShopHub - E-Commerce Platform

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB. Supports both buyers and sellers with a complete product management and order system.

## Features

### Buyer Features
- Browse and search products with filters (category, price range)
- View detailed product information
- Add products to shopping cart
- Checkout with shipping address
- View order history
- User authentication

### Seller Features
- Create and manage products
- View seller dashboard with analytics
- Manage orders received
- Update order status
- View revenue and sales statistics

### Admin Features
- Full control over products and users
- Order management

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 19** - UI library
- **React Router 7** - Routing
- **Redux Toolkit** - State management
- **RTK Query** - API caching and fetching
- **Tailwind CSS** - Styling
- **Vite** - Build tool

## Project Structure

```
E-Commerce Store/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── userController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── productModel.js
│   │   ├── userModel.js
│   │   └── orderModel.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── BuyerHome.jsx
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── RegisterScreen.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductDetailsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   ├── SellerDashboard.jsx
│   │   │   ├── SellerProductsPage.jsx
│   │   │   └── AddProductPage.jsx
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SellerRoute.jsx
│   │   │   └── BuyerRoute.jsx
│   │   ├── slices/
│   │   │   ├── apiSlice.js
│   │   │   ├── authSlice.js
│   │   │   ├── cartSlice.js
│   │   │   ├── productsApiSlice.js
│   │   │   ├── ordersApiSlice.js
│   │   │   └── usersApiSlice.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── router.js
│   │   ├── store.js
│   │   └── index.css
│   ├── .env.example
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random
NODE_ENV=development
```

5. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Running the Application

### Development Mode (from root directory)

Run both backend and frontend concurrently:
```bash
npm run dev
```

### Production Build

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a product (sellers only)
- `PUT /api/products/:id` - Update a product (sellers only)
- `DELETE /api/products/:id` - Delete a product (sellers only)
- `GET /api/products/seller/my-products` - Get seller's products

### Orders
- `POST /api/orders` - Create an order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order payment
- `GET /api/orders/seller/orders` - Get seller's orders
- `PUT /api/orders/:id/status` - Update order status

## Features in Detail

### Search and Filtering
- Search products by name and description
- Filter by category, price range
- Real-time search results

### Shopping Cart
- Add/remove products from cart
- Update product quantities
- Persistent cart storage (localStorage)
- Cart summary with totals

### Checkout Process
- Shipping address form
- Multiple payment methods
- Order summary and review
- Order confirmation

### Seller Dashboard
- Overview of sales and revenue
- Product management (CRUD)
- Order management with status updates
- Analytics and statistics

### Security Features
- JWT authentication
- Password hashing with bcryptjs
- Protected routes
- CORS enabled
- HTTP-only cookies

## User Roles

### Buyer
- Browse products
- Purchase items
- Track orders
- View order history

### Seller
- List products for sale
- Manage inventory
- View orders received
- Update order status
- Track revenue

### Admin
- Full access to all features
- User management
- Platform management

## State Management

The application uses Redux Toolkit for state management with the following slices:

- **authSlice** - User authentication state
- **cartSlice** - Shopping cart state
- **productsApiSlice** - Product API integration (RTK Query)
- **ordersApiSlice** - Order API integration (RTK Query)
- **usersApiSlice** - User API integration (RTK Query)

## Styling

The application uses Tailwind CSS for styling with:
- Responsive design (mobile, tablet, desktop)
- Dark mode support ready
- Consistent color scheme
- Reusable components
- Smooth transitions and animations

## Error Handling

- Global error middleware
- Try-catch blocks in async operations
- User-friendly error messages
- Validation on frontend and backend

## Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- Email notifications
- Product reviews and ratings
- Wishlist feature
- Advanced analytics
- Product recommendations
- Social login
- Two-factor authentication
- Admin panel UI

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For support, email support@shophub.com or create an issue in the repository.

## Acknowledgments

- React documentation
- MongoDB documentation
- Tailwind CSS community
- Redux documentation
