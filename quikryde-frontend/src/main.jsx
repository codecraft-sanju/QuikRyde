import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider'
import RideProvider from './context/RideProvider'
import PaymentProvider from './context/PaymentProvider'
import AdminProvider from './context/AdminProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RideProvider>
          <PaymentProvider>
            <AdminProvider>
              <App />
            </AdminProvider>
          </PaymentProvider>
        </RideProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
