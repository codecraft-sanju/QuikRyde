import React from 'react';
import PaymentContext from './PaymentContext';
import axios from '../api/axios';

const PaymentProvider = ({ children }) => {
  const createPayment = async (paymentDetails) => {
    const { data } = await axios.post('/api/payments/create', paymentDetails, { withCredentials: true });
    return data; 
  };

  return (
    <PaymentContext.Provider value={{ createPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
