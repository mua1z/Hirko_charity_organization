import { useState, useEffect } from 'react';
import api from '../../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setStats(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats?.total_users || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Active Staff</h3>
          <p>{stats?.active_staff || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Donetars</h3>
          <p>{stats?.donetars || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Recent Activity</h3>
          <p>{stats?.recent_activity || 0}</p>
        </div>
      </div>
      
      <section className="recent-users">
        <h2>Recent Users</h2>
        {stats?.recent_users?.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent users</p>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;