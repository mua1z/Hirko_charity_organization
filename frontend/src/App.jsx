// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { useAuth } from './hooks/useAuth';

import ProtectedRoute from './pages/layout/ProtectedRoute';
import VerifiedRoute from './pages/layout/VerifiedRoute';
import VerifyEmail from './pages/auth/VerifyEmail';
import ResendVerification from './pages/auth/ResendVerification';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import ChangePassword from './pages/profile/ChangePassword';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import StaffDashboard from './pages/dashboard/StaffDashboard';
import DonetarDashboard from './pages/dashboard/DonetarDashboard';
import Logout from './pages/Logout';
import Layout from './pages/Layout';
import  Home  from './pages/Home';


 // Adjust the path as needed

export default function App() {
// Get user from context
const { user } = useAuth();
  return (


    <Router>

      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Route>
      <Route path="/verify-email/:id/:hash" element={<VerifyEmail />} />
        <Route path="/verify-email" element={<ResendVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
       
        
    {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<VerifiedRoute />}>
            <Route element={<DashboardLayout />}>
              {/* Role-based dashboard routes */}
              <Route 
                path="/dashboard" 
                element={
                  user?.roles?.[0]?.name === 'Admin' ? <AdminDashboard /> :
                  user?.roles?.[0]?.name === 'Staff' ? <StaffDashboard /> :
                  <DonetarDashboard />
                } 
              />
              
              {/* Admin-specific routes */}
              {user?.roles?.[0]?.name === 'Admin' && (
                <>
                  <Route path="/dashboard/users" element={<div>Manage Users</div>} />
                  <Route path="/dashboard/settings" element={<div>System Settings</div>} />
                </>
              )}
              
              {/* Staff-specific routes */}
              {user?.roles?.[0]?.name === 'Staff' && (
                <>
                  <Route path="/dashboard/tasks" element={<div>Tasks</div>} />
                  <Route path="/dashboard/reports" element={<div>Reports</div>} />
                </>
              )}
              
              {/* Donetar-specific routes */}
              {user?.roles?.[0]?.name === 'Donetar' && (
                <>
                  <Route path="/dashboard/donations" element={<div>My Donations</div>} />
                  <Route path="/dashboard/history" element={<div>Donation History</div>} />
                </>
              )}
            </Route>
            
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/change-password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}