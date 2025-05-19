import { useState, useEffect } from 'react';
import api from '../../services/api';

function DonetarDashboard() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, donationsRes] = await Promise.all([
          api.get('/donetar/dashboard'),
          api.get('/donetar/donations')
        ]);
        
        setStats(statsRes.data);
        setDonations(donationsRes.data);
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
    <div className="donetar-dashboard">
      <h1>Donetar Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Donations</h3>
          <p>{stats?.total_donations || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>This Month</h3>
          <p>{stats?.monthly_donations || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Last Donation</h3>
          <p>
            {stats?.last_donation_date ? 
              new Date(stats.last_donation_date).toLocaleDateString() : 
              'Never'}
          </p>
        </div>
      </div>
      
      <section className="recent-donations">
        <h2>Your Recent Donations</h2>
        {donations.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(donation => (
                <tr key={donation.id}>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                  <td>${donation.amount.toFixed(2)}</td>
                  <td>{donation.type}</td>
                  <td className={`status-${donation.status}`}>{donation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No donation history</p>
        )}
      </section>
      
      <div className="call-to-action">
        <h3>Make a New Donation</h3>
        <button className="donate-btn">Donate Now</button>
      </div>
    </div>
  );
}

export default DonetarDashboard;