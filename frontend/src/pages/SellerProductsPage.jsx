import { useNavigate } from 'react-router-dom';
import { useGetSellerProductsQuery, useDeleteProductMutation } from '../slices/productsApiSlice';
import Layout from '../components/Layout';

const SellerProductsPage = () => {
  const navigate = useNavigate();
  const { data: products = [], isLoading, refetch } = useGetSellerProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();


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
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId).unwrap();
        refetch();
        alert('Product deleted successfully');
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  return (
    <Layout>
      <div className="w-screen px-4 sm:px-6 lg:px-8 py-8 bg-[#D4DE95]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{ color: '#3D4127' }}>My Products</h1>
          <button
            onClick={() => navigate('/seller/add-product')}
            className="px-6 py-3 text-white rounded-lg transition hover:shadow-lg transform hover:scale-105"
            style={{ backgroundColor: '#636B2F' }}
          >
            + Add Product
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#636B2F' }}></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-[#BAC095] rounded-lg">
            <p className="text-lg mb-4" style={{ color: '#3D4127' }}>No products yet</p>
            <button
              onClick={() => navigate('/seller/add-product')}
              className="px-6 py-3 text-white rounded-lg"
              style={{ backgroundColor: '#636B2F' }}
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ backgroundColor: '#D4DE95' }}>
                  <th className="text-left py-4 px-6 font-semibold" style={{ color: '#3D4127' }}>Product</th>
                  <th className="text-left py-4 px-6 font-semibold" style={{ color: '#3D4127' }}>Category</th>
                  <th className="text-left py-4 px-6 font-semibold" style={{ color: '#3D4127' }}>Price</th>
                  <th className="text-left py-4 px-6 font-semibold" style={{ color: '#3D4127' }}>Stock</th>
                  <th className="text-left py-4 px-6 font-semibold" style={{ color: '#3D4127' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-[#D4DE95] transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={getBase64Image(product.image)}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium" style={{ color: '#3D4127' }}>{product.name}</p>
                          <p className="text-sm line-clamp-1" style={{ color: '#636B2F' }}>{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6" style={{ color: '#636B2F' }}>{product.category}</td>
                    <td className="py-4 px-6 font-semibold" style={{ color: '#636B2F' }}>
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.countInStock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.countInStock} units
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => navigate(`/seller/edit-product/${product._id}`)}
                          className="font-medium text-sm hover:underline"
                          style={{ color: '#636B2F' }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="font-medium text-sm hover:underline text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SellerProductsPage;
