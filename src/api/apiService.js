import { USERS, DOCTORS, DEPARTMENTS, INITIAL_APPOINTMENTS } from './mockData';

class MockApiService {
  constructor() {
    const storedUsers = localStorage.getItem('medbook_users');
    const storedAppts = localStorage.getItem('medbook_appointments');
    const storedDepts = localStorage.getItem('medbook_departments');
    const storedDoctors = localStorage.getItem('medbook_doctors');

    this.users = storedUsers ? JSON.parse(storedUsers) : [...USERS];
    this.doctors = storedDoctors ? JSON.parse(storedDoctors) : [...DOCTORS];
    this.departments = storedDepts ? JSON.parse(storedDepts) : [...DEPARTMENTS];
    this.appointments = storedAppts ? JSON.parse(storedAppts) : [...INITIAL_APPOINTMENTS];
    this.prescriptions = JSON.parse(localStorage.getItem('medbook_prescriptions')) || [];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  }

  saveToStorage() {
    localStorage.setItem('medbook_users', JSON.stringify(this.users));
    localStorage.setItem('medbook_appointments', JSON.stringify(this.appointments));
    localStorage.setItem('medbook_departments', JSON.stringify(this.departments));
    localStorage.setItem('medbook_doctors', JSON.stringify(this.doctors));
    localStorage.setItem('medbook_prescriptions', JSON.stringify(this.prescriptions));
  }

  // --- AUTH ---
  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          this.currentUser = userWithoutPassword;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          resolve(this.currentUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  async register(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.users.some(u => u.email === userData.email)) {
          return reject(new Error('Email already registered'));
        }

        const newUser = {
          id: Date.now(),
          active: true,
          ...userData,
        };
        
        // If doctor role is selected, we need to create a doctor profile too
        if (userData.role === 'DOCTOR') {
          const newDoc = {
            id: Date.now() + 1,
            name: userData.name,
            specialization: userData.specialization || 'General Physician',
            departmentId: parseInt(userData.departmentId) || 5,
            experience: 0,
            bio: 'New medical professional at MedBook.',
            availability: [
              { day: 'Monday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
              { day: 'Tuesday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
              { day: 'Wednesday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
              { day: 'Thursday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
              { day: 'Friday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
            ]
          };
          this.doctors.push(newDoc);
          newUser.doctorId = newDoc.id;
        }

        this.users.push(newUser);
        this.saveToStorage();
        resolve(newUser);
      }, 800);
    });
  }

  // --- DOCTORS ---
  async getDoctors(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [...this.doctors];
        if (filters.specialization) {
          result = result.filter(d => d.specialization.toLowerCase().includes(filters.specialization.toLowerCase()));
        }
        if (filters.departmentId) {
          result = result.filter(d => d.departmentId === parseInt(filters.departmentId));
        }
        resolve(result);
      }, 500);
    });
  }

  async getDoctorSlots(doctorId, date) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doctor = this.doctors.find(d => d.id === parseInt(doctorId));
        if (!doctor) return resolve([]);
        
        const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        const availability = doctor.availability.find(a => a.day === day);
        
        if (!availability) return resolve([]);

        // Simple slot generation
        const slots = [];
        let current = availability.startTime;
        while (current < availability.endTime) {
          const [hours, minutes] = current.split(':').map(Number);
          const isBooked = this.appointments.some(a => 
            a.doctorId === doctor.id && a.date === date && a.slotTime === current && a.status !== 'CANCELLED'
          );
          
          slots.push({ time: current, available: !isBooked });
          
          // Increment by duration
          const nextMinutes = minutes + availability.slotDuration;
          const nextHours = hours + Math.floor(nextMinutes / 60);
          current = `${String(nextHours).padStart(2, '0')}:${String(nextMinutes % 60).padStart(2, '0')}`;
        }
        resolve(slots);
      }, 600);
    });
  }

  // --- APPOINTMENTS ---
  async bookAppointment(appointmentData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAppt = {
          id: Date.now(),
          ...appointmentData,
          status: 'CONFIRMED'
        };
        this.appointments.push(newAppt);
        this.saveToStorage();
        resolve(newAppt);
      }, 800);
    });
  }

  async getMyAppointments(userId, role) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [];
        if (role === 'PATIENT') {
          result = this.appointments.filter(a => a.patientId === userId);
        } else if (role === 'DOCTOR') {
          const user = this.users.find(u => u.id === userId);
          result = this.appointments.filter(a => a.doctorId === user.doctorId);
        }
        
        // Enrich with doctor/patient names
        const enriched = result.map(a => ({
          ...a,
          doctorName: this.doctors.find(d => d.id === a.doctorId)?.name,
          patientName: this.users.find(u => u.id === a.patientId)?.name
        }));
        
        resolve(enriched);
      }, 500);
    });
  }

  async updateAppointmentStatus(id, status) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const appt = this.appointments.find(a => a.id === id);
        if (appt) {
          appt.status = status;
          this.saveToStorage();
        }
        resolve(appt);
      }, 400);
    });
  }

  async createPrescription(prescriptionData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPres = {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          ...prescriptionData
        };
        this.prescriptions.push(newPres);
        this.saveToStorage();
        resolve(newPres);
      }, 600);
    });
  }

  async getMyPrescriptions(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = this.prescriptions.filter(p => p.patientId === userId);
        resolve(result);
      }, 400);
    });
  }

  // --- DEPARTMENTS ---
  async getDepartments() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.departments), 300);
    });
  }

  async addDepartment(deptData) {
    this.departments.push({ id: Date.now(), ...deptData });
    this.saveToStorage();
  }

  async deleteDepartment(id) {
    this.departments = this.departments.filter(d => d.id !== id);
    this.saveToStorage();
  }

  async toggleUserStatus(userId) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.active = !user.active;
      this.saveToStorage();
    }
  }
}

export const apiService = new MockApiService();
