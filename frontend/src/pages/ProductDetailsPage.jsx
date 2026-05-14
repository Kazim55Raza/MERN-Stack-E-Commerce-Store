import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdQuery } from '../slices/productsApiSlice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import Layout from '../components/Layout';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
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
  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          product: product._id,
          name: product.name,
          image: getBase64Image(product.image),
          price: product.price,
          seller: product.seller._id,
          qty: parseInt(qty),
        })
      );
      alert('Product added to cart!');
      navigate('/cart');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-600">Product not found</p>
            <button
              onClick={() => navigate('/products')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Products
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/products')}
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow p-8">
          {/* Image Section */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={getBase64Image(product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.countInStock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>

            {/* Seller Info */}
            <div className="flex items-center space-x-2 mb-4 pb-4 border-b">
              <span className="text-gray-600">Seller:</span>
              <span className="font-semibold text-gray-900">{product.seller.name}</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                ${product.price.toFixed(2)}
              </div>
              <p className="text-gray-600">
                {product.countInStock > 0 ? (
                  <span className="text-green-600 font-semibold">✓ In Stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">✗ Out of Stock</span>
                )}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Info */}
            <div className="mb-6 pb-6 border-b grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Brand</p>
                <p className="font-semibold text-gray-900">{product.brand}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-semibold text-gray-900">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Stock Available</p>
                <p className="font-semibold text-gray-900">{product.countInStock} units</p>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            {product.countInStock > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition text-lg"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => navigate('/products')}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition"
                >
                  Continue Shoppping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
