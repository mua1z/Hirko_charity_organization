import api from './api';

const AuthService = {

   getDashboardRoute(role) {
    // Convert role to lowercase for case-insensitive comparison
    const normalizedRole = role?.toLowerCase();
    
    switch (normalizedRole) {
      case 'admin':
        return '/dashboard';
      case 'staff':
        return '/dashboard';
      case 'donetar':
        return '/dashboard';
      default:
        return '/';
    }
  },
  async register(userData) {
    try {
      const response = await api.post('/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.passwordConfirmation,
        role: userData.role,
      });
      
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

   async login(credentials) {
    try {
      const response = await api.post('/login', {
        email: credentials.email,
        password: credentials.password,
      });
      
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        ...response.data,
        redirect_to: this.getDashboardRoute(response.data.user?.roles?.[0]?.name)
      };
    } catch (error) {
      throw error.response?.data || error;
    }
  },


  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    return api.post('/logout');
  },

  async verifyEmail(id, hash) {
  try {
    const response = await api.get(`/email/verify/${id}/${hash}`);
    return {
      ...response.data,
      redirect_to: this.getDashboardRoute(response.data.user?.roles?.[0]?.name)
    };
  } catch (error) {
    throw error.response?.data || error;
  }
},

  async resendVerificationEmail() {
    try {
      const response = await api.post('/email/verification-notification');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getAuthToken() {
    return localStorage.getItem('access_token');
  },

  isAuthenticated() {
    return !!this.getAuthToken();
  },
};

export default AuthService;