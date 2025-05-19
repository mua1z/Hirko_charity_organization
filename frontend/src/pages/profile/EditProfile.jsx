import { useState, useEffect } from 'react';
import ProfileService from '../../services/profile';

function EditProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await ProfileService.getProfile();
        setFormData({
          name: data.name,
          email: data.email,
        });
      } catch (error) {
        setErrors({ general: error.message || 'Failed to load profile' });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await ProfileService.updateProfile(formData);
      setMessage(response.message || 'Profile updated successfully');
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({ general: error.message || 'Failed to update profile' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Profile</h1>
      {errors.general && <div className="error">{errors.general}</div>}
      {message && <div className="success">{message}</div>}
      
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

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

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}

export default EditProfile;