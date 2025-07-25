import React, { useState, useEffect } from 'react';
import AdminContext from './AdminContext';
import axios from '../api/axios';

const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [payments, setPayments] = useState([]);

  const fetchAllUsers = async () => {
    const { data } = await axios.get('/api/admin/users', { withCredentials: true });
    setUsers(data);
  };

  const fetchAllRides = async () => {
    const { data } = await axios.get('/api/admin/rides', { withCredentials: true });
    setRides(data);
  };

  const fetchAllPayments = async () => {
    const { data } = await axios.get('/api/admin/payments', { withCredentials: true });
    setPayments(data);
  };

  return (
    <AdminContext.Provider
      value={{ users, rides, payments, fetchAllUsers, fetchAllRides, fetchAllPayments }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
