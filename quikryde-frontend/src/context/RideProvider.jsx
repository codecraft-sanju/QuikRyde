import React, { useState, useEffect } from 'react';
import RideContext from './RideContext';
import axios from '../api/axios';

const RideProvider = ({ children }) => {
  const [myRides, setMyRides] = useState([]);

  const bookRide = async (rideDetails) => {
    const { data } = await axios.post('/api/rides/book', rideDetails, { withCredentials: true });
    setMyRides((prev) => [...prev, data]);
  };

  const fetchMyRides = async () => {
    const { data } = await axios.get('/api/rides/myrides', { withCredentials: true });
    setMyRides(data);
  };

  useEffect(() => {
    fetchMyRides();
  }, []);

  return (
    <RideContext.Provider value={{ myRides, bookRide, fetchMyRides }}>
      {children}
    </RideContext.Provider>
  );
};

export default RideProvider;
