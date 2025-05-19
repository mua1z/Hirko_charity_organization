import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth';

function VerifyEmail() {
  const { id, hash } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await AuthService.verifyEmail(id, hash);
        setMessage(response.message);
        if (response.redirect_to) {
          navigate(response.redirect_to);
        }
      } catch (error) {
        setMessage(error.message || 'Email verification failed.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [id, hash, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
      {isLoading && <p>Please wait...</p>}
    </div>
  );
}

export default VerifyEmail;