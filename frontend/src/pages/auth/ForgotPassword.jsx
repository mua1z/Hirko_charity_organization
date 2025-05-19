import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordService from '../../services/password';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await PasswordService.forgotPassword(email);
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
      <h1>Forgot Password</h1>
      {errors.general && <div className="error">{errors.general}</div>}
      {message && <div className="success">{message}</div>}
      
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  );
}

export default ForgotPassword;