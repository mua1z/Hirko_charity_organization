import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

function ResendVerification() {
  const { resendVerificationEmail } = useAuth();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const response = await resendVerificationEmail();
      setMessage(response.message || 'Verification email sent successfully.');
    } catch (error) {
      setMessage(error.message || 'Failed to resend verification email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Resend Verification Email</h1>
      <p>Didn't receive the verification email?</p>
      <button onClick={handleResend} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Resend Email'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResendVerification;