// src/components/Navbar.jsx
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login'; // Full page reload to clear state
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="p-4 bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-white">Welcome, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}