import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BuyerRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && !userInfo.isSeller ? <Outlet /> : <Navigate to='/login' replace />;
};

export default BuyerRoute;
