import { useContext } from 'react';
import { AuthProvider } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

const PrivatRoute = ({ children }) => {
  const { user, loading } = useContext(AuthProvider);
  const location = useLocation();
  if (loading) return <Loader />;
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} />;
};

export default PrivatRoute;
