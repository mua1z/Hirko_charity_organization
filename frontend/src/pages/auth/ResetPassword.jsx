import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PasswordService from '../../services/password';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    token: token,
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
      const response = await PasswordService.resetPassword(formData);
      setMessage(response.message);
      navigate('/login');
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({ general: error.message || 'Password reset failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      {errors.general && <div className="error">{errors.general}</div>}
      {message && <div className="success">{message}</div>}
      
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span>{errors.email}</span>}
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
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
}

export default ResetPassword;