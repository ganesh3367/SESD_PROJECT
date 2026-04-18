import React from 'react';
import { apiService } from '../api/apiService';
import { Link, Navigate } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'PATIENT',
      specialization: '',
      departmentId: '',
      departments: [],
      error: '',
      success: false,
      loading: false
    };
  }

  async componentDidMount() {
    const depts = await apiService.getDepartments();
    this.setState({ departments: depts });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, role, specialization, departmentId } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    if (role === 'DOCTOR' && (!specialization || !departmentId)) {
      this.setState({ error: 'Please fill in all doctor-specific fields' });
      return;
    }

    this.setState({ loading: true, error: '' });

    try {
      await apiService.register({ 
        name, 
        email, 
        password, 
        role, 
        specialization: role === 'DOCTOR' ? specialization : undefined,
        departmentId: role === 'DOCTOR' ? departmentId : undefined
      });
      this.setState({ success: true, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  };

  render() {
    const { name, email, password, confirmPassword, error, success, loading } = this.state;

    if (success) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="auth-container">
        <div className="auth-card glass">
          <h1 style={{ marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Join MedBook to manage your health digitaly</p>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                name="name"
                className="form-input" 
                value={name}
                onChange={this.handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                name="email"
                className="form-input" 
                value={email}
                onChange={this.handleChange}
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  name="password"
                  className="form-input" 
                  value={password}
                  onChange={this.handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="form-label">Confirm</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  className="form-input" 
                  value={confirmPassword}
                  onChange={this.handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">I am a...</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="button" 
                  className={`glass ${this.state.role === 'PATIENT' ? 'active-role' : ''}`}
                  style={{ flex: 1, padding: '0.75rem', cursor: 'pointer', border: this.state.role === 'PATIENT' ? '2px solid var(--primary)' : '1px solid var(--border)' }}
                  onClick={() => this.setState({ role: 'PATIENT' })}
                >
                  Patient
                </button>
                <button 
                  type="button" 
                  className={`glass ${this.state.role === 'DOCTOR' ? 'active-role' : ''}`}
                  style={{ flex: 1, padding: '0.75rem', cursor: 'pointer', border: this.state.role === 'DOCTOR' ? '2px solid var(--primary)' : '1px solid var(--border)' }}
                  onClick={() => this.setState({ role: 'DOCTOR' })}
                >
                  Doctor
                </button>
              </div>
            </div>

            {this.state.role === 'DOCTOR' && (
              <div className="animate-fade" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
                <div className="form-group">
                  <label className="form-label">Specialization</label>
                  <input 
                    type="text" 
                    name="specialization"
                    className="form-input" 
                    value={this.state.specialization}
                    onChange={this.handleChange}
                    placeholder="e.g. Cardiologist"
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Department</label>
                  <select 
                    name="departmentId"
                    className="form-input" 
                    value={this.state.departmentId}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {this.state.departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {error && (
              <div style={{ color: 'var(--error)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
