import React from 'react';
import { apiService } from '../api/apiService';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: '' });

    try {
      const user = await apiService.login(this.state.email, this.state.password);
      this.props.onLogin(user);
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  };

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <div className="auth-container">
        <div className="auth-card glass">
          <h1 style={{ marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Login to access your MedBook dashboard</p>

          <form onSubmit={this.handleSubmit}>
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

            <div className="form-group">
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

            {error && (
              <div style={{ color: 'var(--error)', marginBottom: '1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-dim)' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Register</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
