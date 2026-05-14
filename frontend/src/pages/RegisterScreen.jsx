import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isSeller) {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await register({ name, email, password, role }).unwrap();
      dispatch(setCredentials({ ...res }));
      if (res.isSeller) {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#BAC095] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#636B2F' }}>ShopHub</h1>
            <p className="text-gray-600">Create your account</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition"
                style={{ '--tw-ring-color': '#636B2F' }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition"
                style={{ '--tw-ring-color': '#636B2F' }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition"
                style={{ '--tw-ring-color': '#636B2F' }}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition"
                style={{ '--tw-ring-color': '#636B2F' }}
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to:
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition"
                  style={{ borderColor: role === 'buyer' ? '#636B2F' : '#d1d5db', backgroundColor: role === 'buyer' ? '#D4DE95' : '#ffffff' }}>
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={role === 'buyer'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4"
                    style={{ accentColor: '#636B2F' }}
                  />
                  <span className="ml-3">
                    <span className="block font-medium text-gray-900">Buy Goods</span>
                    <span className="text-sm text-gray-600">Browse and purchase products</span>
                  </span>
                </label>

                <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition"
                  style={{ borderColor: role === 'seller' ? '#636B2F' : '#d1d5db', backgroundColor: role === 'seller' ? '#D4DE95' : '#ffffff' }}>
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={role === 'seller'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4"
                    style={{ accentColor: '#636B2F' }}
                  />
                  <span className="ml-3">
                    <span className="block font-medium text-gray-900">Sell Goods</span>
                    <span className="text-sm text-gray-600">Start selling products</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 rounded focus:ring-2"
                style={{ accentColor: '#636B2F' }}
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <Link to="#" className="hover:underline font-medium" style={{ color: '#636B2F' }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="hover:underline font-medium" style={{ color: '#636B2F' }}>
                  Privacy Policy
                </Link>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 text-white font-bold rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#636B2F' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3D4127'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#636B2F'}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="hover:underline font-medium" style={{ color: '#636B2F' }}>
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm" style={{ color: '#3D4127' }}>
          <p>© 2024 ShopHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;