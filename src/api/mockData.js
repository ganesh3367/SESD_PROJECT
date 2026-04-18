export const DEPARTMENTS = [
  { id: 1, name: 'Cardiology', description: 'Heart and cardiovascular system' },
  { id: 2, name: 'Neurology', description: 'Brain and nervous system' },
  { id: 3, name: 'Pediatrics', description: 'Children medical care' },
  { id: 4, name: 'Orthopedics', description: 'Musculoskeletal system' },
  { id: 5, name: 'General Medicine', description: 'Primary health care' },
];

export const DOCTORS = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiologist',
    departmentId: 1,
    experience: 12,
    qualification: 'MD, DM (Cardiology)',
    bio: 'Specialist in interventional cardiology with over 12 years of experience.',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Friday', startTime: '09:00', endTime: '13:00', slotDuration: 30 },
    ]
  },
  {
    id: 2,
    name: 'Dr. James Miller',
    specialization: 'Neurologist',
    departmentId: 2,
    experience: 8,
    qualification: 'MD, DNB (Neurology)',
    bio: 'Expert in treating complex neurological disorders and headaches.',
    availability: [
      { day: 'Tuesday', startTime: '10:00', endTime: '18:00', slotDuration: 45 },
      { day: 'Thursday', startTime: '10:00', endTime: '18:00', slotDuration: 45 },
    ]
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialization: 'Pediatrician',
    departmentId: 3,
    experience: 15,
    qualification: 'MBBS, MD (Pediatrics)',
    bio: 'Compassionate care for children from newborns to adolescents.',
    availability: [
      { day: 'Monday', startTime: '08:00', endTime: '14:00', slotDuration: 20 },
      { day: 'Tuesday', startTime: '08:00', endTime: '14:00', slotDuration: 20 },
      { day: 'Wednesday', startTime: '08:00', endTime: '14:00', slotDuration: 20 },
      { day: 'Thursday', startTime: '08:00', endTime: '14:00', slotDuration: 20 },
      { day: 'Friday', startTime: '08:00', endTime: '14:00', slotDuration: 20 },
    ]
  }
];

export const USERS = [
  { id: 1, name: 'Patient John', email: 'john@example.com', password: 'password', role: 'PATIENT' },
  { id: 2, name: 'Doctor Sarah', email: 'sarah@medbook.com', password: 'password', role: 'DOCTOR', doctorId: 1 },
  { id: 3, name: 'Admin Mike', email: 'admin@medbook.com', password: 'password', role: 'ADMIN' },
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    date: '2026-04-20',
    slotTime: '10:00',
    status: 'CONFIRMED',
    reason: 'Regular heart checkup'
  }
];
