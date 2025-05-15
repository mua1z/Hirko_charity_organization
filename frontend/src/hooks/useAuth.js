// src/hooks/useAuth.js
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
    
    // Check auth status when hook is first used
    checkAuth();
    
    // Optional: Set up an event listener for auth changes
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    user,
    isAuthenticated,
    login: AuthService.login,
    register: AuthService.register,
    logout: AuthService.logout,
  };
}