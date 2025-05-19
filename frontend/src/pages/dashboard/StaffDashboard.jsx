import { useState, useEffect } from 'react';
import api from '../../services/api';

function StaffDashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, tasksRes] = await Promise.all([
          api.get('/staff/dashboard'),
          api.get('/staff/tasks')
        ]);
        
        setStats(statsRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="staff-dashboard">
      <h1>Staff Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Assigned Tasks</h3>
          <p>{stats?.assigned_tasks || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p>{stats?.completed_tasks || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Pending Approval</h3>
          <p>{stats?.pending_approval || 0}</p>
        </div>
      </div>
      
      <section className="recent-tasks">
        <h2>Your Tasks</h2>
        {tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.status}`}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span>Status: {task.status}</span>
                  <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks assigned</p>
        )}
      </section>
    </div>
  );
}

export default StaffDashboard;