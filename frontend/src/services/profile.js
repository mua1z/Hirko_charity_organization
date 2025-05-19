import api from './api';

const ProfileService = {
  async getProfile() {
    try {
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async updateProfile(profileData) {
    try {
      const response = await api.put('/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async updatePassword(passwordData) {
    try {
      const response = await api.put('/profile/password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default ProfileService;