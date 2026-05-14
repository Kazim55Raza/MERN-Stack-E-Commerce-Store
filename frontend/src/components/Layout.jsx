import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#D4DE95]">
      {/* Navigation */}
      <nav className="bg-[#BAC095] shadow-sm w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold" style={{ color: '#636B2F' }}>
              ShopHub
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:underline font-semibold" style={{ color: '#3D4127' }}>Home</Link>
              <Link to="/products" className="hover:underline font-semibold" style={{ color: '#3D4127' }}>Products</Link>
              {userInfo ? (
                <>
                  {userInfo.isSeller && (
                    <Link to="/seller/dashboard" className="hover:underline font-semibold" style={{ color: '#3D4127' }}>Seller Dashboard</Link>
                  )}
                  {!userInfo.isSeller && (
                    <>
                      <Link to="/cart" className="relative hover:underline font-semibold" style={{ color: '#3D4127' }}>
                        Cart
                        {cartItems.length > 0 && (
                          <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
                            {cartItems.length}
                          </span>
                        )}
                      </Link>
                      <Link to="/orders" className="hover:underline font-semibold" style={{ color: '#3D4127' }}>Orders</Link>
                    </>
                  )}
                  <div className="relative group">
                    <button className="hover:underline flex items-center space-x-1 font-semibold" style={{ color: '#3D4127' }}>
                      <span>{userInfo.name}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2 z-50 hidden group-hover:block">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:underline font-semibold" style={{ color: '#3D4127' }}>Login</Link>
                  <Link to="/register" className="bg-[#636B2F] text-white px-4 py-2 rounded-lg hover:bg-[#3D4127] transition">Register</Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link to="/" className="block text-gray-600 hover:text-blue-600 py-2">
                Home
              </Link>
              <Link to="/products" className="block text-gray-600 hover:text-blue-600 py-2">
                Products
              </Link>

              {userInfo ? (
                <>
                  {userInfo.isSeller && (
                    <Link to="/seller/dashboard" className="block text-gray-600 hover:text-blue-600 py-2">
                      Seller Dashboard
                    </Link>
                  )}
                  <Link to="/cart" className="block text-gray-600 hover:text-blue-600 py-2">
                    Cart ({cartItems.length})
                  </Link>
                  <Link to="/orders" className="block text-gray-600 hover:text-blue-600 py-2">
                    Orders
                  </Link>
                  <Link to="/profile" className="block text-gray-600 hover:text-blue-600 py-2">
                    {userInfo.name}
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left text-gray-600 hover:text-blue-600 py-2">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block text-gray-600 hover:text-blue-600 py-2">
                    Login
                  </Link>
                  <Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-2">
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#3D4127] text-[#D4DE95] py-8 mt-12 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p className="text-gray-400">Your trusted online marketplace for quality products.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/products" className="hover:text-white">Products</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-400">Email: support@shophub.com</p>
              <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
