import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="user-info">
          <h3>{user?.name}</h3>
          <p>{user?.roles?.[0]?.name}</p>
        </div>
        
        <nav className="dashboard-nav">
          <ul>
            <li><Link to="/dashboard">Overview</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            
            {/* Admin-specific links */}
            {user?.roles?.[0]?.name === 'Admin' && (
              <>
                <li><Link to="/dashboard/users">Manage Users</Link></li>
                <li><Link to="/dashboard/settings">System Settings</Link></li>
              </>
            )}
            
            {/* Staff-specific links */}
            {user?.roles?.[0]?.name === 'Staff' && (
              <>
                <li><Link to="/dashboard/tasks">Tasks</Link></li>
                <li><Link to="/dashboard/reports">Reports</Link></li>
              </>
            )}
            
            {/* Donetar-specific links */}
            {user?.roles?.[0]?.name === 'Donetar' && (
              <>
                <li><Link to="/dashboard/donations">My Donations</Link></li>
                <li><Link to="/dashboard/history">Donation History</Link></li>
              </>
            )}
          </ul>
        </nav>
        
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </aside>
      
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;