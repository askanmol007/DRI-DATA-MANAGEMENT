
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
// import Loading from '../components/Loading'
const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  
  if (!user) {
    return <Navigate to='/auth' />;
  }
  return children;
};

export default ProtectedRoute