import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { apiService } from './api/apiService';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';

// Wrapper: hide Navbar on landing page
function NavbarWrapper({ user, onLogout }) {
  const location = useLocation();
  if (location.pathname === '/') return null;
  return <Navbar user={user} onLogout={onLogout} />;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: apiService.currentUser,
      loading: true
    };
  }

  componentDidMount() {
    // Listen for auth changes from Firebase via our service
    const checkAuth = () => {
      this.setState({ 
        user: apiService.currentUser,
        loading: false 
      });
    };

    // Poll for current user if it takes a moment to load from storage/firebase
    this.authInterval = setInterval(checkAuth, 500);
    
    // Initial check
    checkAuth();
  }

  componentWillUnmount() {
    if (this.authInterval) clearInterval(this.authInterval);
  }

  handleLogin = (user) => {
    this.setState({ user });
  };

  handleLogout = async () => {
    await apiService.logout();
    this.setState({ user: null });
  };

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: 'var(--primary)', fontWeight: '600' }}>Initialising Secure Connection...</p>
          </div>
        </div>
      );
    }

    return (
      <Router>
        <NavbarWrapper user={user} onLogout={this.handleLogout} />
        <main className="animate-fade">
          <Routes>
            {/* Landing: show product page if not logged in, else redirect to dashboard */}
            <Route path="/" element={
              user ? <Navigate to={`/${user.role.toLowerCase()}`} /> : <LandingPage />
            } />

            <Route path="/login" element={
              user ? <Navigate to={`/${user.role.toLowerCase()}`} /> : <Login onLogin={this.handleLogin} />
            } />

            <Route path="/register" element={
              user ? <Navigate to={`/${user.role.toLowerCase()}`} /> : <Register />
            } />

            {/* Role-Based Private Routes */}
            <Route path="/patient/*" element={
              user?.role === 'PATIENT' ? <PatientDashboard user={user} /> : <Navigate to="/login" />
            } />

            <Route path="/doctor/*" element={
              user?.role === 'DOCTOR' ? <DoctorDashboard user={user} /> : <Navigate to="/login" />
            } />

            <Route path="/admin/*" element={
              user?.role === 'ADMIN' ? <AdminDashboard user={user} /> : <Navigate to="/login" />
            } />
          </Routes>
        </main>
      </Router>
    );
  }
}

export default App;
