import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthService from '../../services/auth';

function VerifiedRoute() {
  const { user } = useAuth();
  
  // If user is not verified, redirect to verification notice
  if (user && !user.email_verified_at) {
    return <Navigate to="/verify-email" replace />;
  }

  return <Outlet />;
}

export default VerifiedRoute;