import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Layout from '../components/Layout';

export default function BuyerHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: allProducts = [] } = useGetProductsQuery({});

  // Get random 4 products for hot items
  const hotItems = allProducts.slice(0, Math.min(4, allProducts.length));

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        seller: product.seller._id,
        qty: 1,
      })
    );
    alert('Product added to cart!');
  };

  return (
    <Layout>
      <div className="bg-[#D4DE95] w-full">
        {/* Hero Section */}
        <section className="bg-[#636B2F] text-white py-20 px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to ShopHub</h1>
                <p className="text-xl text-blue-100 mb-8">
                  Discover amazing products from trusted sellers. Shop with confidence, guaranteed quality and fast delivery.
                </p>
                <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                  <button
                    onClick={() => navigate('/products')}
                    className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition"
                  >
                    Start Shopping
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition"
                  >
                    Become a Seller
                  </button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="hidden md:block">
                <div className="text-6xl text-center">
                  🛍️
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hot Items Carousel */}
        {hotItems.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full">
            <div className="mb-8">
              <h2 className="text-4xl font-bold" style={{ color: '#3D4127' }}>
                <span className="text-4xl mr-3">🔥</span> Featured Products
              </h2>
              <p className="mt-2" style={{ color: '#636B2F' }}>Check out our best-selling items</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotItems.map((product) => (
                <div
                  key={product._id}
                  className="bg-[#BAC095] rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  {/* Image */}
                  <div className="h-48 bg-[#D4DE95] overflow-hidden cursor-pointer group">
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.countInStock === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-yellow-500 font-bold">⭐ 4.5</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">
                      by {product.seller?.name || 'Seller'}
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="w-full px-4 py-2 bg-[#D4DE95] text-[#3D4127] rounded-lg hover:bg-[#BAC095] transition font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.countInStock === 0}
                        className="w-full px-4 py-2 bg-[#636B2F] text-white rounded-lg hover:bg-[#3D4127] transition font-medium disabled:bg-gray-400"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="bg-[#BAC095] py-16 px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#3D4127' }}>
              Why Choose ShopHub?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-8 bg-[#D4DE95] rounded-lg hover:shadow-lg transition">
                <div className="text-5xl mb-4">🚚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Get your products delivered quickly with reliable tracking
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-8 bg-[#BAC095] rounded-lg hover:shadow-lg transition">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600">
                  Your transactions are protected with industry-leading security
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-8 bg-[#3D4127] text-[#D4DE95] rounded-lg hover:shadow-lg transition">
                <div className="text-5xl mb-4">🎁</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Returns</h3>
                <p className="text-gray-600">
                  Not satisfied? Return within 30 days for a full refund
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* All Products Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold" style={{ color: '#3D4127' }}>All Products</h2>
            <button
              onClick={() => navigate('/products')}
              className="font-bold hover:underline" style={{ color: '#636B2F' }}
            >
              View All →
            </button>
          </div>

          {allProducts.length > 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.slice(0, 8).map((product) => (
                <div
                  key={product._id}
                  className="bg-[#D4DE95] rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="h-48 bg-[#BAC095] overflow-hidden cursor-pointer group">
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-2 cursor-pointer hover:underline" style={{ color: '#3D4127' }}
                      onClick={() => navigate(`/products/${product._id}`)}>
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-2xl font-bold" style={{ color: '#636B2F' }}>
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs bg-[#D4DE95] text-[#3D4127] px-2 py-1 rounded">
                        {product.countInStock > 0 ? 'In Stock' : 'Out'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 mt-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Browse thousands of products from trusted sellers. Find exactly what you're looking for.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg"
            >
              Browse All Products
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
                  
                 