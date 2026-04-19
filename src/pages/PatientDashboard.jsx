import React from 'react';
import { apiService } from '../api/apiService';
import { Search, Calendar, ChevronRight, Clock, MapPin, Star } from 'lucide-react';

class PatientDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      doctors: [],
      departments: [],
      searchQuery: '',
      selectedDept: '',
      loading: true,
      activeTab: 'doctors',
      prescriptions: [],
      bookingDoctor: null,
      bookingSlots: [],
      selectedDate: new Date().toISOString().split('T')[0],
      selectedSlot: null
    };
  }

  componentDidMount() {
    this.fetchData();
    this.unsubscribeAppts = apiService.subscribeToMyAppointments(this.props.user.id, 'PATIENT', (appts) => {
      this.setState({ appointments: appts });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeAppts) {
      this.unsubscribeAppts();
    }
  }

  fetchData = async () => {
    this.setState({ loading: true });
    try {
      const [docs, depts, pres] = await Promise.all([
        apiService.getDoctors(),
        apiService.getDepartments(),
        apiService.getMyPrescriptions(this.props.user.id)
      ]);
      this.setState({ doctors: docs, departments: depts, prescriptions: pres, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleDeptChange = (e) => {
    this.setState({ selectedDept: e.target.value });
  };

  startBooking = async (doctor) => {
    this.setState({ bookingDoctor: doctor, bookingSlots: [], selectedSlot: null });
    const slots = await apiService.getDoctorSlots(doctor.id, this.state.selectedDate);
    this.setState({ bookingSlots: slots });
  };

  handleDateChange = async (e) => {
    const date = e.target.value;
    this.setState({ selectedDate: date, selectedSlot: null });
    if (this.state.bookingDoctor) {
      const slots = await apiService.getDoctorSlots(this.state.bookingDoctor.id, date);
      this.setState({ bookingSlots: slots });
    }
  };

  confirmBooking = async () => {
    const { bookingDoctor, selectedDate, selectedSlot } = this.state;
    if (!selectedSlot) return;

    try {
      await apiService.bookAppointment({
        patientId: this.props.user.id,
        doctorId: bookingDoctor.id,
        date: selectedDate,
        slotTime: selectedSlot,
        reason: 'General Consultation'
      });
      this.setState({ bookingDoctor: null });
      alert('Appointment booked successfully!');
    } catch (err) {
      alert('Failed to book: ' + err.message);
    }
  };

  render() {
    const { 
      appointments, doctors, departments, searchQuery, selectedDept, 
      loading, bookingDoctor, bookingSlots, selectedDate, selectedSlot 
    } = this.state;

    const filteredDoctors = doctors.filter(d => 
      (d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       d.specialization.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedDept === '' || d.departmentId === parseInt(selectedDept))
    );

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard...</div>;

    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem' }}>Welcome, {this.props.user.name}</h1>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            className={`glass ${this.state.activeTab === 'doctors' ? 'active-role' : ''}`}
            style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', border: 'none' }}
            onClick={() => this.setState({ activeTab: 'doctors' })}
          >
            Find Doctors
          </button>
          <button 
            className={`glass ${this.state.activeTab === 'records' ? 'active-role' : ''}`}
            style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', border: 'none' }}
            onClick={() => this.setState({ activeTab: 'records' })}
          >
            Medical Records
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          
          {/* Main Content */}
          <div>
            {this.state.activeTab === 'doctors' ? (
              <div className="premium-card glass" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                    <input 
                      type="text" 
                      className="form-input" 
                      style={{ paddingLeft: '2.5rem' }} 
                      placeholder="Search doctors by name or specialty..."
                      value={searchQuery}
                      onChange={this.handleSearch}
                    />
                  </div>
                  <select 
                    className="form-input" 
                    style={{ width: '200px' }}
                    value={selectedDept}
                    onChange={this.handleDeptChange}
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {filteredDoctors.map(doc => (
                    <div key={doc.id} className="premium-card" style={{ background: '#ffffff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                        <div className="glass" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)' }}>
                          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{doc.name[4]}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warning)' }}>
                          <Star size={14} fill="currentColor" />
                          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>4.9</span>
                        </div>
                      </div>
                      <h3 style={{ marginBottom: '0.25rem' }}>{doc.name}</h3>
                      <p style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>{doc.specialization}</p>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>{doc.qualification}</span>
                        <span>{doc.experience} Years Exp.</span>
                      </div>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '1.5rem', lineHeight: '1.4', height: '3.2em', overflow: 'hidden' }}>{doc.bio}</p>
                      <button 
                        className="btn-primary" 
                        style={{ fontSize: '0.875rem' }}
                        onClick={() => this.startBooking(doc)}
                      >
                        Book Appointment
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="premium-card glass">
                <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Calendar size={24} color="var(--primary)" />
                  My Medical Records
                </h2>
                {this.state.prescriptions.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-dim)' }}>No medical records available yet.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {this.state.prescriptions.map(pres => (
                      <div key={pres.id} className="glass" style={{ padding: '1.5rem', background: '#ffffff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <h3 style={{ margin: 0 }}>Dr. {pres.doctorName || 'General Practitioner'}</h3>
                          <span style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>{pres.date}</span>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong style={{ color: 'var(--primary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Diagnosis</strong>
                          <p style={{ marginTop: '0.25rem' }}>{pres.diagnosis}</p>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                          <strong style={{ color: 'var(--primary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Medicines</strong>
                          <p style={{ marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{pres.medicines}</p>
                        </div>
                        {pres.notes && (
                          <div>
                            <strong style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Notes</strong>
                            <p style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>{pres.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar: My Appointments */}
          <div>
            <div className="premium-card glass">
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={20} color="var(--primary)" />
                My Appointments
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {appointments.length === 0 ? (
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', textAlign: 'center', padding: '1rem' }}>No upcoming appointments</p>
                ) : (
                  appointments.map(appt => (
                    <div key={appt.id} className="glass" style={{ padding: '1rem', background: '#ffffff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: appt.status === 'CONFIRMED' ? 'var(--success)' : 'var(--text-dim)' }}>
                          {appt.status}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>#{appt.id}</span>
                      </div>
                      <h4 style={{ marginBottom: '0.5rem' }}>{appt.doctorName}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                        <Calendar size={14} />
                        {appt.date}
                        <Clock size={14} style={{ marginLeft: '0.5rem' }} />
                        {appt.slotTime}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Booking Modal (Using regular div for simplicity in this demo) */}
        {bookingDoctor && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass auth-card" style={{ maxWidth: '500px', textAlign: 'left' }}>
              <h2 style={{ marginBottom: '1rem' }}>Book with {bookingDoctor.name}</h2>
              
              <div className="form-group">
                <label className="form-label">Select Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Available Slots</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                  {bookingSlots.length === 0 ? (
                    <p style={{ gridColumn: 'span 4', color: 'var(--error)', fontSize: '0.8rem' }}>No slots available for this date</p>
                  ) : (
                    bookingSlots.map(slot => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => this.setState({ selectedSlot: slot.time })}
                        className="glass"
                        style={{ 
                          padding: '0.5rem', 
                          fontSize: '0.8rem', 
                          border: selectedSlot === slot.time ? '2px solid var(--primary)' : '1px solid var(--border)',
                          opacity: slot.available ? 1 : 0.4,
                          cursor: slot.available ? 'pointer' : 'not-allowed',
                          background: selectedSlot === slot.time ? 'rgba(14, 165, 233, 0.1)' : 'transparent'
                        }}
                      >
                        {slot.time}
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button className="btn-primary" style={{ background: '#334155' }} onClick={() => this.setState({ bookingDoctor: null })}>Cancel</button>
                <button className="btn-primary" disabled={!selectedSlot} onClick={this.confirmBooking}>Confirm Booking</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PatientDashboard;
