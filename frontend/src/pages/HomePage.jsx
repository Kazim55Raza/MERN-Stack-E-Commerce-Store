import { useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../slices/productsApiSlice';

export default function HomePage() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: products = [] } = useGetProductsQuery({});


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
  // Redirect logged-in users to appropriate dashboard
  useEffect(() => {
    if (userInfo) {
      if (userInfo.isSeller) {
        navigate('/seller/dashboard');
      } else {
        navigate('/buyer');
      }
    }
  }, [userInfo, navigate]);

  return (
    <Layout>
      <div className="w-full overflow-hidden ">
        {/* Hero Section with Animation */}
        <section className="bg-gradient-to-r from-[#636B2F] to-[#3D4127] text-white py-32 px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text Content with Animation */}
              <div className="animate-fade-in">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">Welcome to ShopHub</h1>
                <p className="text-xl text-[#D4DE95] mb-8 leading-relaxed">
                  Discover amazing products from trusted sellers. Shop with confidence, guaranteed quality and fast delivery.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 bg-[#D4DE95] text-[#3D4127] font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-8 py-4 border-2 border-[#D4DE95] text-[#D4DE95] font-bold rounded-lg hover:bg-[#D4DE95] hover:text-[#3D4127] transform hover:scale-105 transition duration-300"
                  >
                    Register
                  </button>
                </div>
              </div>
              {/* Hero Image/Icon with Animation */}
              <div className="hidden md:flex justify-center animate-bounce-slow">
                <div className="text-9xl">🛍️</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#BAC095] py-16 px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-4xl font-bold text-[#3D4127] mb-2">10K+</h3>
                <p className="text-[#636B2F]">Products Available</p>
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-4xl font-bold text-[#3D4127] mb-2">500+</h3>
                <p className="text-[#636B2F]">Trusted Sellers</p>
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-4xl font-bold text-[#3D4127] mb-2">50K+</h3>
                <p className="text-[#636B2F]">Happy Customers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#D4DE95] py-20 px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full">
            <h2 className="text-4xl font-bold text-[#3D4127] text-center mb-16">Why Choose ShopHub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: '🚚', title: 'Fast Delivery', desc: 'Get products within 2-3 days' },
                { icon: '🛡️', title: 'Secure Payment', desc: 'Your money is always protected' },
                { icon: '↩️', title: 'Easy Returns', desc: 'Return within 30 days hassle-free' },
                { icon: '⭐', title: 'Quality Assured', desc: 'Only verified sellers allowed' },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-[#3D4127] mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        {products.length > 0 && (
          <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 w-full">
            <div className="w-full">
              <h2 className="text-4xl font-bold text-[#3D4127] mb-4">Featured Products</h2>
              <p className="text-gray-600 mb-12">Explore our bestselling items</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product, idx) => (
                  <div
                    key={product._id}
                    className="bg-[#BAC095] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${idx * 0.15}s` }}
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <div className="h-48 bg-[#D4DE95] overflow-hidden">
                      <img
                        src={getBase64Image(product.image)}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 text-left  ">
                      <h3 className="font-bold text-[#3D4127] line-clamp-2">{product.name.toUpperCase()    }</h3>
                      <p className="text-[#636B2F] font-bold text-lg mt-2">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-[#3D4127] text-white py-20 px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-[#D4DE95] mb-8">Join ShopHub today and start shopping or selling!</p>
            <button
              onClick={() => navigate('/register')}
              className="px-10 py-4 bg-[#D4DE95] text-[#3D4127] font-bold text-lg rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300"
            >
              Join Now
            </button>
          </div>
        </section>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </Layout>
  );
}
