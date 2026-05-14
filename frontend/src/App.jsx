import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import router from './router';
import { useGetProfileQuery } from './slices/usersApiSlice';
import { setCredentials, setInitialized } from './slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: profile, error, isLoading } = useGetProfileQuery(undefined, {
    skip: !userInfo,
  });

  useEffect(() => {
    // If user is in localStorage, verify with backend
    if (userInfo && profile && !error) {
      dispatch(setCredentials(profile));
    } else if (error) {
      // Clear invalid auth
      localStorage.clear();
    }
    dispatch(setInitialized(true));
  }, [profile, error, userInfo, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;

