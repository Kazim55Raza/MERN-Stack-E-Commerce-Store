import { useNavigate } from 'react-router-dom';
import { useGetSellerOrdersQuery } from '../slices/ordersApiSlice';
import { useGetSellerProductsQuery } from '../slices/productsApiSlice';
import Layout from '../components/Layout';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading: ordersLoading } = useGetSellerOrdersQuery();
  const { data: products = [], isLoading: productsLoading } = useGetSellerProductsQuery();

  const totalRevenue = orders.reduce((acc, order) => {
    const orderTotal = order.orderItems
      .filter((item) => item.seller)
      .reduce((sum, item) => sum + item.price * item.qty, 0);
    return acc + orderTotal;
  }, 0);

  const completedOrders = orders.filter((order) => order.status === 'Delivered').length;
  const pendingOrders = orders.filter((order) => order.status === 'Pending').length;

  const statsCards = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: '💰',
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Total Products',
      value: products.length,
      icon: '📦',
      color: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Total Orders',
      value: orders.length,
      icon: '📋',
      color: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Pending Orders',
      value: pendingOrders,
      icon: '⏱️',
      color: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Seller Dashboard</h1>
          <button
            onClick={() => navigate('/seller/add-product')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, idx) => (
            <div key={idx} className={`${card.color} rounded-lg shadow p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                  <p className={`text-3xl font-bold ${card.textColor} mt-2`}>
                    {card.value}
                  </p>
                </div>
                <span className="text-4xl">{card.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                <button
                  onClick={() => navigate('/seller/orders')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All →
                </button>
              </div>

              {ordersLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : orders.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No orders yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Order ID</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Customer</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order._id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-900 font-medium">
                            {order._id.substring(0, 8)}...
                          </td>
                          <td className="py-3 px-4 text-gray-600">{order.user.name}</td>
                          <td className="py-3 px-4 text-gray-900 font-medium">
                            ${order.totalPrice.toFixed(2)}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === 'Delivered'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'Shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'Processing'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Products Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Products</h3>
              <p className="text-3xl font-bold text-gray-900 mb-4">{products.length}</p>
              <button
                onClick={() => navigate('/seller/products')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Manage Products
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/seller/add-product')}
                  className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium text-left"
                >
                  + Add New Product
                </button>
                <button
                  onClick={() => navigate('/seller/orders')}
                  className="w-full px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition font-medium text-left"
                >
                  📋 View All Orders
                </button>
                <button
                  onClick={() => navigate('/seller/analytics')}
                  className="w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition font-medium text-left"
                >
                  📊 View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
