import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut, User as UserIcon } from 'lucide-react';

class Navbar extends React.Component {
  render() {
    const { user, onLogout } = this.props;

    return (
      <nav className="navbar glass">
        <Link to="/" className="nav-link">
          <div className="logo">
            <Activity size={32} />
            <span>MedBook</span>
          </div>
        </Link>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
              Logged in as <strong style={{ color: 'var(--text-main)' }}>{user.name}</strong> ({user.role})
            </span>
            <button 
              onClick={onLogout}
              className="btn-primary" 
              style={{ width: 'auto', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </nav>
    );
  }
}

export default Navbar;
