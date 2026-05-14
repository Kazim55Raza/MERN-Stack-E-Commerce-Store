import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
// import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux'; // Add useSelector here

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  // const { userInfo } = useSelector((state) => state.auth);

  // // 2. ADD THIS LINE to create the toggle variable
  // const [isMyProducts, setIsMyProducts] = useState(false);

  const params = {
    ...(search && { search }),
    ...(category && { category }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    // ...(isMyProducts && userInfo && { sellerId: userInfo._id }),
  };

  const { data: products = [], isLoading, error } = useGetProductsQuery(params);

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys'];
 const getBase64Image = (image) => {
  // If no image or it's already a string URL, return as is
  if (!image || typeof image === 'string') return image || '/images/sample.jpg';

  // If it's the MongoDB Buffer object we saw in your screenshots
  if (image.data && image.data.data) {
    const base64String = btoa(
      new Uint8Array(image.data.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    return `data:${image.contentType};base64,${base64String}`;
  }

  return '/images/sample.jpg'; // Fallback
};
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        product: product._id, 
      name: product.name,
      image: getBase64Image(product.image), // Your successful image fix!
      price: product.price,
      seller: product.seller._id,
      qty: 1,
      })
    );
    alert('Product added to cart!');
  };
 

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Products</h1>

        {/* Search and Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* for only products */}
{/* {userInfo && (
    <div className="flex items-center mt-4 p-2 bg-blue-50 rounded-lg">
      <input
        type="checkbox"
        id="myProducts"
        checked={isMyProducts}
        onChange={(e) => setIsMyProducts(e.target.checked)}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
      />
      <label htmlFor="myProducts" className="ml-2 text-sm font-medium text-blue-800">
        Show only my products
      </label>
    </div>
  )} */}
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSearch('');
              setCategory('');
              setMinPrice('');
              setMaxPrice('');
            }}
            className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-600">Error loading products. Please try again later.</p>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Image */}
                <div className="h-48 bg-gray-200 overflow-hidden cursor-pointer group">
                  <img
                    // src={product.image}
                    src={getBase64Image(product.image)}
                    alt={product.name}
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600 line-clamp-2"
                  >
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    by {product.seller.name}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.countInStock === 0}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Products */}
        {!isLoading && products.length === 0 && !error && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No products found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
