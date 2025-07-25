import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import BookRidePage from './pages/BookRidePage';
import MyRidesPage from './pages/MyRidesPage';
import PaymentPage from './pages/PaymentPage';
import AdminDashboard from './pages/AdminDashboard';

function YourRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book" element={<BookRidePage />} />
              <Route path="/myrides" element={<MyRidesPage />} />
              <Route path="/pay" element={<PaymentPage />} />
<Route path="/admin" element={<AdminDashboard />} />


      </Routes>
    </>
  );
}

export default YourRoutes;
