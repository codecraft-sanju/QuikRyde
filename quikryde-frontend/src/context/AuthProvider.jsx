import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import axios from '../api/axios';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Debug log: initial load
  useEffect(() => {
    const fetchProfile = async () => {
      console.log('[AuthProvider] Fetching profile...');
      try {
        const { data } = await axios.get('/api/users/profile', {
          withCredentials: true,
        });
        console.log('[AuthProvider] Profile fetched:', data);
        setUser(data);
      } catch (error) {
        console.warn('[AuthProvider] No profile found:', error?.response?.data);
        setUser(null);
      } finally {
        console.log('[AuthProvider] Profile fetch done.');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const login = async (credentials) => {
    console.log('[AuthProvider] Login payload:', credentials);
    try {
      const loginRes = await axios.post('/api/auth/login', credentials, {
        withCredentials: true,
      });
      console.log('[AuthProvider] Login success:', loginRes?.data);

      const { data } = await axios.get('/api/users/profile', {
        withCredentials: true,
      });
      console.log('[AuthProvider] Profile after login:', data);
      setUser(data);
    } catch (error) {
      console.error('[AuthProvider] Login error:', error?.response?.data || error);
      throw error;
    }
  };

  const logout = async () => {
    console.log('[AuthProvider] Logging out...');
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      console.log('[AuthProvider] Logout success');
    } catch (error) {
      console.error('[AuthProvider] Logout error:', error?.response?.data || error);
    } finally {
      setUser(null);
    }
  };

  const register = async (details) => {
    console.log('[AuthProvider] Register payload:', details);
    try {
      const regRes = await axios.post('/api/auth/register', details, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('[AuthProvider] Register success:', regRes?.data);

      const { data } = await axios.get('/api/users/profile', {
        withCredentials: true,
      });
      console.log('[AuthProvider] Profile after register:', data);
      setUser(data);
    } catch (error) {
      console.error('[AuthProvider] Register error:', error?.response?.data || error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
