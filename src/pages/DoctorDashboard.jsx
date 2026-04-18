import React from 'react';
import { apiService } from '../api/apiService';
import { Calendar, CheckCircle, Clock, User, Clipboard, Pill } from 'lucide-react';

class DoctorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      loading: true,
      completingAppt: null,
      diagnosis: '',
      medicines: '',
      notes: ''
    };
  }

  async componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments = async () => {
    this.setState({ loading: true });
    try {
      const appts = await apiService.getMyAppointments(this.props.user.id, 'DOCTOR');
      this.setState({ appointments: appts, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  };

  handleStatusUpdate = async (id, status) => {
    await apiService.updateAppointmentStatus(id, status);
    this.fetchAppointments();
  };

  openPrescription = (appt) => {
    this.setState({ completingAppt: appt, diagnosis: '', medicines: '', notes: '' });
  };

  submitPrescription = async () => {
    const { completingAppt, diagnosis, medicines, notes } = this.state;
    
    try {
      await apiService.createPrescription({
        appointmentId: completingAppt.id,
        doctorId: completingAppt.doctorId,
        patientId: completingAppt.patientId,
        patientName: completingAppt.patientName,
        diagnosis,
        medicines,
        notes
      });
      
      await this.handleStatusUpdate(completingAppt.id, 'COMPLETED');
      this.setState({ completingAppt: null });
      alert(`Prescription saved for ${completingAppt.patientName}`);
    } catch (err) {
      alert('Failed to save prescription: ' + err.message);
    }
  };

  render() {
    const { appointments, loading, completingAppt, diagnosis, medicines, notes } = this.state;

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard...</div>;

    const pending = appointments.filter(a => a.status === 'CONFIRMED');
    const completed = appointments.filter(a => a.status === 'COMPLETED');

    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ marginBottom: '0.5rem' }}>Doctor Dashboard</h1>
            <p style={{ color: 'var(--text-dim)' }}>Welcome back, {this.props.user.name}. You have {pending.length} appointments today.</p>
          </div>
          <div className="premium-card glass" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Clipboard color="var(--primary)" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{pending.length}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>To-Do</div>
            </div>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          
          {/* Main Content: Appointment Queue */}
          <section>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--primary)" />
              Upcoming Patients
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pending.length === 0 ? (
                <div className="premium-card glass" style={{ textAlign: 'center', padding: '3rem' }}>
                  <CheckCircle size={48} color="var(--success)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <p style={{ color: 'var(--text-dim)' }}>All caught up! No pending appointments.</p>
                </div>
              ) : (
                pending.map(appt => (
                  <div key={appt.id} className="premium-card glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div className="glass" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyCenter: 'center', background: 'rgba(255,255,255,0.05)' }}>
                        <User size={20} color="var(--text-dim)" />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem' }}>{appt.patientName}</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>{appt.reason}</p>
                      </div>
                      <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '1.5rem', height: '30px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--primary)' }}>
                          <Clock size={16} />
                          {appt.slotTime}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button 
                        className="btn-primary" 
                        style={{ width: 'auto', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', border: '1px solid var(--border)' }}
                        onClick={() => this.handleStatusUpdate(appt.id, 'CANCELLED')}
                      >
                        Cancel
                      </button>
                      <button 
                        className="btn-primary" 
                        style={{ width: 'auto' }}
                        onClick={() => this.openPrescription(appt)}
                      >
                        Complete & Prescribe
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Sidebar: Activity History */}
          <aside>
            <div className="premium-card glass">
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clipboard size={18} color="var(--text-dim)" />
                Recent Activity
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {completed.length === 0 ? (
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>No recent activity</p>
                ) : (
                  completed.slice(0, 5).map(appt => (
                    <div key={appt.id} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ color: 'var(--success)' }}><CheckCircle size={16} /></div>
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{appt.patientName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Patient seen at {appt.slotTime}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Prescription Modal */}
        {completingAppt && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass auth-card" style={{ maxWidth: '600px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Pill size={24} color="var(--primary)" />
                <h2 style={{ margin: 0 }}>Write Prescription</h2>
              </div>
              <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>Patient: <strong>{completingAppt.patientName}</strong></p>
              
              <div className="form-group">
                <label className="form-label">Diagnosis</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={diagnosis} 
                  onChange={(e) => this.setState({ diagnosis: e.target.value })}
                  placeholder="e.g. Hypertension, Seasonal Allergies" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Medicines & Dosage</label>
                <textarea 
                  className="form-input" 
                  rows="3" 
                  style={{ resize: 'none' }}
                  value={medicines}
                  onChange={(e) => this.setState({ medicines: e.target.value })}
                  placeholder="e.g. Paracetamol 500mg - 1-0-1 (3 days)"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea 
                  className="form-input" 
                  rows="2" 
                  style={{ resize: 'none' }}
                  value={notes}
                  onChange={(e) => this.setState({ notes: e.target.value })}
                  placeholder="e.g. Drink plenty of water, Avoid oily food"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button className="btn-primary" style={{ background: '#334155' }} onClick={() => this.setState({ completingAppt: null })}>Close</button>
                <button className="btn-primary" onClick={this.submitPrescription}>Save & Finalize</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DoctorDashboard;
