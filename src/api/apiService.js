import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { USERS, DOCTORS, DEPARTMENTS, INITIAL_APPOINTMENTS } from './mockData';

class FirebaseApiService {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    
    // Auth state listener
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          this.currentUser = { uid: user.uid, id: user.uid, ...userDoc.data() };
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
      } else {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
      }
    });

    // Check if we need to seed data (only in dev/initial run)
    this.seedInitialData();
  }

  async seedInitialData() {
    const deptSnap = await getDocs(collection(db, 'departments'));
    if (deptSnap.empty) {
      console.log('Seeding initial data to Firebase...');
      
      // Seed Departments
      for (const dept of DEPARTMENTS) {
        await setDoc(doc(db, 'departments', String(dept.id)), dept);
      }

      // Seed Doctors
      for (const docObj of DOCTORS) {
        await setDoc(doc(db, 'doctors', String(docObj.id)), docObj);
      }
    }
  }

  // --- AUTH ---
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (!userData.active) throw new Error('Your account has been deactivated');
        
        this.currentUser = { uid: userCredential.user.uid, id: userCredential.user.uid, ...userData };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        return this.currentUser;
      }
      throw new Error('User data not found');
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    await signOut(auth);
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  async register(userData) {
    try {
      const { email, password, name, role, specialization, departmentId } = userData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const newUserDoc = {
        name,
        email,
        role,
        active: true,
        createdAt: serverTimestamp()
      };

      if (role === 'DOCTOR') {
        const docId = Date.now(); // Generate a doctor ID for referencing
        const newDocProfile = {
          id: docId,
          name,
          specialization: specialization || 'General Physician',
          departmentId: parseInt(departmentId) || 5,
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
        
        await setDoc(doc(db, 'doctors', String(docId)), newDocProfile);
        newUserDoc.doctorId = docId;
      }

      await setDoc(doc(db, 'users', uid), newUserDoc);
      return { uid, id: uid, ...newUserDoc };
    } catch (error) {
      throw error;
    }
  }

  // --- DOCTORS ---
  async getDoctors(filters = {}) {
    const docsSnap = await getDocs(collection(db, 'doctors'));
    let doctors = docsSnap.docs.map(d => d.data());

    if (filters.specialization) {
      doctors = doctors.filter(d => d.specialization.toLowerCase().includes(filters.specialization.toLowerCase()));
    }
    if (filters.departmentId) {
      doctors = doctors.filter(d => d.departmentId === parseInt(filters.departmentId));
    }
    return doctors;
  }

  async getDoctorSlots(doctorId, date) {
    const docRef = doc(db, 'doctors', String(doctorId));
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return [];

    const doctor = docSnap.data();
    const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const availability = doctor.availability.find(a => a.day === day);
    
    if (!availability) return [];

    const slots = [];
    let current = availability.startTime;
    
    // Fetch existing appointments for this doctor/date
    const q = query(
      collection(db, 'appointments'), 
      where('doctorId', '==', parseInt(doctorId)), 
      where('date', '==', date)
    );
    const apptsSnap = await getDocs(q);
    const bookedSlots = apptsSnap.docs
      .map(d => d.data())
      .filter(a => a.status !== 'CANCELLED')
      .map(a => a.slotTime);

    while (current < availability.endTime) {
      const [hours, minutes] = current.split(':').map(Number);
      const isBooked = bookedSlots.includes(current);
      
      slots.push({ time: current, available: !isBooked });
      
      const nextMinutes = minutes + availability.slotDuration;
      const nextHours = hours + Math.floor(nextMinutes / 60);
      current = `${String(nextHours).padStart(2, '0')}:${String(nextMinutes % 60).padStart(2, '0')}`;
    }
    return slots;
  }

  // --- APPOINTMENTS ---
  async bookAppointment(appointmentData) {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      status: 'CONFIRMED',
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...appointmentData, status: 'CONFIRMED' };
  }

  async getMyAppointments(userId, role) {
    let q;
    if (role === 'PATIENT') {
      q = query(collection(db, 'appointments'), where('patientId', '==', userId));
    } else if (role === 'DOCTOR') {
      // Find the doctor ID for this user
      const userDoc = await getDoc(doc(db, 'users', userId));
      const doctorId = userDoc.data()?.doctorId;
      q = query(collection(db, 'appointments'), where('doctorId', '==', doctorId));
    } else {
      return [];
    }

    const apptsSnap = await getDocs(q);
    const appointments = apptsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Enrich with names
    const enriched = await Promise.all(appointments.map(async (a) => {
      const doctorSnap = await getDoc(doc(db, 'doctors', String(a.doctorId)));
      // For patient name, we need to find the user with that UID
      // Since patientId in appointments is currently UID (string) in Firebase
      const patientSnap = await getDoc(doc(db, 'users', a.patientId));
      
      return {
        ...a,
        doctorName: doctorSnap.exists() ? doctorSnap.data().name : 'Unknown Doctor',
        patientName: patientSnap.exists() ? patientSnap.data().name : 'Unknown Patient'
      };
    }));

    return enriched;
  }

  async updateAppointmentStatus(id, status) {
    const apptRef = doc(db, 'appointments', id);
    await updateDoc(apptRef, { status });
    return { id, status };
  }

  // --- PRESCRIPTIONS ---
  async createPrescription(prescriptionData) {
    const docRef = await addDoc(collection(db, 'prescriptions'), {
      date: new Date().toISOString().split('T')[0],
      ...prescriptionData,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...prescriptionData };
  }

  async getMyPrescriptions(userId) {
    const q = query(collection(db, 'prescriptions'), where('patientId', '==', userId));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  // --- DEPARTMENTS ---
  async getDepartments() {
    const snap = await getDocs(collection(db, 'departments'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async addDepartment(deptData) {
    const id = Date.now().toString();
    await setDoc(doc(db, 'departments', id), { id, ...deptData });
  }

  async deleteDepartment(id) {
    await deleteDoc(doc(db, 'departments', String(id)));
  }

  async toggleUserStatus(userId) {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      await updateDoc(userRef, { active: !userSnap.data().active });
    }
  }

  async getAllUsers() {
    const snap = await getDocs(collection(db, 'users'));
    return snap.docs.map(d => ({ uid: d.id, ...d.data() }));
  }
}

export const apiService = new FirebaseApiService();
