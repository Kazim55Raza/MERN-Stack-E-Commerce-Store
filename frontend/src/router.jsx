import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// Pages
import BuyerHome from './pages/BuyerHome';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import SellerDashboard from './pages/SellerDashboard';
import SellerProductsPage from './pages/SellerProductsPage';
import AddProductPage from './pages/AddProductPage';
import HomePage from './pages/HomePage';

// Route Guards
import ProtectedRoute from './components/ProtectedRoute';
import SellerRoute from './components/SellerRoute';


    const router = createBrowserRouter(
  createRoutesFromElements(
    // 1. REMOVE THE FRAGMENT TAGS HERE
    <Route> 
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/buyer" element={<BuyerHome />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />

      {/* Protected Buyer Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>

      {/* Protected Seller Routes */}
      <Route element={<SellerRoute />}>
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerProductsPage />} />
        <Route path="/seller/add-product" element={<AddProductPage />} />
      </Route>

      {/* 404 - Not Found */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900">404</h1>
              <p className="text-gray-600 text-2xl mt-4">Page not found</p>
            </div>
          </div>
        }
      />
    </Route> // 2. CLOSE THE WRAPPING ROUTE
  )
);
  

export default router;
