import { useContext } from 'react';
import { AuthProvider } from '../Context/AuthContext';

const useAuth = () => {
  const context = useContext(AuthProvider);
  return context;
};
export default useAuth;
