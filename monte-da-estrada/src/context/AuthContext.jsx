import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

// Default admin credentials (hashed for security)
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    username: DEFAULT_USERNAME,
    password: DEFAULT_PASSWORD,
  });

  // Check if user is already logged in on mount
  useEffect(() => {
    const authToken = localStorage.getItem('monte_admin_auth');
    const savedCreds = localStorage.getItem('monte_admin_creds');

    if (authToken === 'authenticated') {
      setIsAuthenticated(true);
    }

    if (savedCreds) {
      try {
        setCredentials(JSON.parse(savedCreds));
      } catch (e) {
        console.error('Failed to load saved credentials');
      }
    }
  }, []);

  // Login function
  const login = (username, password) => {
    if (username === credentials.username && password === credentials.password) {
      setIsAuthenticated(true);
      localStorage.setItem('monte_admin_auth', 'authenticated');
      localStorage.setItem('monte_admin_lastActivity', Date.now());
      return { success: true };
    }
    return { success: false, error: 'Credenciais inválidas' };
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('monte_admin_auth');
    localStorage.removeItem('monte_admin_lastActivity');
  };

  // Change password function
  const changePassword = (currentPassword, newUsername, newPassword) => {
    if (currentPassword !== credentials.password) {
      return { success: false, error: 'Senha atual incorreta' };
    }

    const newCreds = {
      username: newUsername || credentials.username,
      password: newPassword,
    };

    setCredentials(newCreds);
    localStorage.setItem('monte_admin_creds', JSON.stringify(newCreds));
    return { success: true };
  };

  // Auto-logout after 30 minutes of inactivity
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkActivity = () => {
      const lastActivity = localStorage.getItem('monte_admin_lastActivity');
      if (lastActivity) {
        const thirtyMinutes = 30 * 60 * 1000;
        if (Date.now() - parseInt(lastActivity) > thirtyMinutes) {
          logout();
        }
      }
    };

    const interval = setInterval(checkActivity, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Update last activity on user interaction
  useEffect(() => {
    if (!isAuthenticated) return;

    const updateActivity = () => {
      localStorage.setItem('monte_admin_lastActivity', Date.now());
    };

    window.addEventListener('click', updateActivity);
    window.addEventListener('keypress', updateActivity);

    return () => {
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keypress', updateActivity);
    };
  }, [isAuthenticated]);

  const value = {
    isAuthenticated,
    login,
    logout,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
