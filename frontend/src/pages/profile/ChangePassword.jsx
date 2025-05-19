import { useState } from 'react';
import ProfileService from '../../services/profile';

function ChangePassword() {
  const [formData, setFormData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await ProfileService.updatePassword(formData);
      setMessage(response.message || 'Password updated successfully');
      setFormData({
        current_password: '',
        password: '',
        password_confirmation: '',
      });
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({ general: error.message || 'Failed to update password' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Change Password</h1>
      {errors.general && <div className="error">{errors.general}</div>}
      {message && <div className="success">{message}</div>}
      
      <div>
        <label>Current Password</label>
        <input
          type="password"
          name="current_password"
          value={formData.current_password}
          onChange={handleChange}
          required
        />
        {errors.current_password && <span>{errors.current_password}</span>}
      </div>

      <div>
        <label>New Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div>
        <label>Confirm New Password</label>
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Change Password'}
      </button>
    </form>
  );
}

export default ChangePassword;