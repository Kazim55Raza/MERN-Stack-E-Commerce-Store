import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import router from './router';
import { useGetProfileQuery } from './slices/usersApiSlice';
import { setCredentials, setInitialized, logout } from './slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { userInfo, isInitialized } = useSelector((state) => state.auth);
  
  // Only query if user exists in localStorage
  const { data: profile, error, isFetching } = useGetProfileQuery(undefined, {
    skip: !userInfo,
  });

  useEffect(() => {
    // If user is in localStorage, verify credentials with backend
    if (userInfo && profile && !error) {
      // Profile is valid, update user info
      dispatch(setCredentials(profile));
    } else if (userInfo && error) {
      // Token is invalid or expired, logout
      dispatch(logout());
    }
    
    // Mark authentication as initialized
    if (!isFetching) {
      dispatch(setInitialized(true));
    }
  }, [profile, error, userInfo, dispatch, isFetching]);

  // If not initialized and user is in storage, wait for verification
  if (!isInitialized && userInfo && !profile && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D4DE95]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4" style={{ borderColor: '#636B2F' }}></div>
          <p style={{ color: '#3D4127' }} className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;

