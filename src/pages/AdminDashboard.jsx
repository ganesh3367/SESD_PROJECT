import React from 'react';
import { apiService } from '../api/apiService';
import { Users, Building, Shield, UserX, UserCheck, Plus, Trash2 } from 'lucide-react';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      departments: [],
      loading: true,
      activeTab: 'users'
    };
  }

  async componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    try {
      const [users, depts] = await Promise.all([
        // Mock get all users - we'll just use the list from service
        Promise.resolve(apiService.users),
        apiService.getDepartments()
      ]);
      this.setState({ users, departments: depts, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  };

  toggleUserStatus = async (userId) => {
    await apiService.toggleUserStatus(userId);
    this.fetchData();
  };

  handleDeleteDept = async (deptId) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      await apiService.deleteDepartment(deptId);
      this.fetchData();
    }
  };

  render() {
    const { users, departments, loading, activeTab } = this.state;

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading admin panel...</div>;

    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield color="var(--primary)" size={32} />
            Admin Control Center
          </h1>
          <p style={{ color: 'var(--text-dim)' }}>Manage users, departments, and system-wide configurations.</p>
        </header>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            className={`btn-primary ${activeTab === 'users' ? '' : 'glass'}`} 
            style={{ width: 'auto', background: activeTab === 'users' ? 'var(--primary)' : 'transparent' }}
            onClick={() => this.setState({ activeTab: 'users' })}
          >
            <Users size={18} style={{ marginRight: '8px' }} />
            User Management
          </button>
          <button 
            className={`btn-primary ${activeTab === 'depts' ? '' : 'glass'}`} 
            style={{ width: 'auto', background: activeTab === 'depts' ? 'var(--primary)' : 'transparent' }}
            onClick={() => this.setState({ activeTab: 'depts' })}
          >
            <Building size={18} style={{ marginRight: '8px' }} />
            Departments
          </button>
        </div>

        <div className="premium-card glass">
          {activeTab === 'users' ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', color: 'var(--text-dim)', fontSize: '0.875rem' }}>
                  <th style={{ padding: '1rem' }}>User</th>
                  <th style={{ padding: '1rem' }}>Email</th>
                  <th style={{ padding: '1rem' }}>Role</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600' }}>{user.name}</div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-dim)' }}>{user.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className="glass" style={{ padding: '4px 8px', fontSize: '0.75rem', fontWeight: 'bold' }}>{user.role}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ color: user.active !== false ? 'var(--success)' : 'var(--error)', fontSize: '0.875rem' }}>
                        {user.active !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => this.toggleUserStatus(user.id)}
                        className="glass" 
                        style={{ padding: '6px', cursor: 'pointer', border: 'none' }}
                        title={user.active !== false ? 'Deactivate' : 'Activate'}
                      >
                        {user.active !== false ? <UserX size={18} color="var(--error)" /> : <UserCheck size={18} color="var(--success)" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem' }}>Departments</h2>
                <button className="btn-primary" style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plus size={18} />
                  Add Department
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {departments.map(dept => (
                  <div key={dept.id} className="glass" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <Building color="var(--primary)" size={24} />
                      <button 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)' }}
                        onClick={() => this.handleDeleteDept(dept.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h3 style={{ marginBottom: '0.5rem' }}>{dept.name}</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>{dept.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
