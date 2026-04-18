import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { apiService } from './api/apiService';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: apiService.currentUser,
      loading: false
    };
  }

  handleLogin = (user) => {
    this.setState({ user });
  };

  handleLogout = () => {
    apiService.logout();
    this.setState({ user: null });
  };

  render() {
    const { user } = this.state;

    return (
      <Router>
        <Navbar user={user} onLogout={this.handleLogout} />
        <main className="animate-fade">
          <Routes>
            <Route path="/" element={<Navigate to={user ? `/${user.role.toLowerCase()}` : "/login"} />} />
            
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
