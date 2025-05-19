import { useState, useEffect } from 'react';
import AuthService from '../services/auth';

export function useAuth() {
  const [user, setUser] = useState(AuthService.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
      setUser(AuthService.getUser());
    };
    
    checkAuth();
    
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    user,
    isAuthenticated,
    login: async (credentials) => {
      const data = await AuthService.login(credentials);
      setUser(AuthService.getUser());
      setIsAuthenticated(true);
      return data;
    },
    register: async (userData) => {
      const data = await AuthService.register(userData);
      setUser(AuthService.getUser());
      setIsAuthenticated(true);
      return data;
    },
    logout: async () => {
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    },
    verifyEmail: AuthService.verifyEmail,
    resendVerificationEmail: AuthService.resendVerificationEmail,


  };
}
export default useAuth;