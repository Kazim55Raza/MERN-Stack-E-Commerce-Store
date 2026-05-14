import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#BAC095] text-[#3D4127] w-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#636B2F]">Welcome to ShopHub</h1>
        <p className="text-xl mb-8 max-w-2xl text-center">
          Discover amazing products from trusted sellers. Shop with confidence, guaranteed quality, and fast delivery.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-[#636B2F] text-white font-bold rounded-lg hover:bg-[#3D4127] transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 border-2 border-[#636B2F] text-[#636B2F] font-bold rounded-lg hover:bg-[#D4DE95] hover:text-[#3D4127] transition"
          >
            Register
          </button>
        </div>
      </div>
    </Layout>
  );
}
