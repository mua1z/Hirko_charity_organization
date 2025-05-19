import api from './api';

const PasswordService = {
  async forgotPassword(email) {
    try {
      const response = await api.post('/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async resetPassword(resetData) {
    try {
      const response = await api.post('/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default PasswordService;