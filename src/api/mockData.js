export const DEPARTMENTS = [
  { id: 1, name: 'Cardiology', description: 'Heart and cardiovascular system' },
  { id: 2, name: 'Neurology', description: 'Brain and nervous system' },
  { id: 3, name: 'Pediatrics', description: 'Children medical care' },
  { id: 4, name: 'Orthopedics', description: 'Musculoskeletal system' },
  { id: 5, name: 'General Medicine', description: 'Primary health care' },
  { id: 6, name: 'Dermatology', description: 'Skin, hair, and nail conditions' },
  { id: 7, name: 'Oncology', description: 'Cancer diagnosis and treatment' },
  { id: 8, name: 'Psychiatry', description: 'Mental health and behavioral disorders' },
  { id: 9, name: 'Gastroenterology', description: 'Digestive system and liver diseases' },
  { id: 10, name: 'Nephrology', description: 'Kidney care and hypertension' },
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
  },
  {
    id: 4,
    name: 'Dr. Robert Brown',
    specialization: 'Orthopedic Surgeon',
    departmentId: 4,
    experience: 20,
    qualification: 'MD, MS (Ortho)',
    bio: 'Specialist in joint replacement and sports medicine.',
    availability: [
      { day: 'Monday', startTime: '10:00', endTime: '16:00', slotDuration: 30 },
      { day: 'Wednesday', startTime: '10:00', endTime: '16:00', slotDuration: 30 },
    ]
  },
  {
    id: 5,
    name: 'Dr. Lisa Ray',
    specialization: 'Dermatologist',
    departmentId: 6,
    experience: 7,
    qualification: 'MD (Dermatology)',
    bio: 'Expert in clinical and cosmetic dermatology.',
    availability: [
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', slotDuration: 15 },
      { day: 'Friday', startTime: '09:00', endTime: '17:00', slotDuration: 15 },
    ]
  },
  {
    id: 6,
    name: 'Dr. Kevin Park',
    specialization: 'Oncologist',
    departmentId: 7,
    experience: 18,
    qualification: 'MD, DM (Oncology)',
    bio: 'Dedicated to advanced cancer treatments and patient-centric care.',
    availability: [
      { day: 'Wednesday', startTime: '08:00', endTime: '20:00', slotDuration: 60 },
    ]
  },
  {
    id: 7,
    name: 'Dr. Anita Desai',
    specialization: 'Psychiatrist',
    departmentId: 8,
    experience: 10,
    qualification: 'MD (Psychiatry)',
    bio: 'Focusing on mental wellness and therapeutic interventions.',
    availability: [
      { day: 'Monday', startTime: '14:00', endTime: '19:00', slotDuration: 45 },
      { day: 'Thursday', startTime: '09:00', endTime: '14:00', slotDuration: 45 },
    ]
  },
  {
    id: 8,
    name: 'Dr. David Foster',
    specialization: 'Gastroenterologist',
    departmentId: 9,
    experience: 14,
    qualification: 'MD, DM (Gastro)',
    bio: 'Specialist in digestive health and endoscopic procedures.',
    availability: [
      { day: 'Tuesday', startTime: '11:00', endTime: '16:00', slotDuration: 30 },
      { day: 'Thursday', startTime: '11:00', endTime: '16:00', slotDuration: 30 },
    ]
  },
  {
    id: 9,
    name: 'Dr. Rachel Green',
    specialization: 'Nephrologist',
    departmentId: 10,
    experience: 9,
    qualification: 'MD, DM (Nephrology)',
    bio: 'Expert in kidney disease management and dialysis.',
    availability: [
      { day: 'Wednesday', startTime: '09:00', endTime: '15:00', slotDuration: 30 },
      { day: 'Friday', startTime: '09:00', endTime: '15:00', slotDuration: 30 },
    ]
  },
  {
    id: 10,
    name: 'Dr. Michael Scott',
    specialization: 'General Physician',
    departmentId: 5,
    experience: 25,
    qualification: 'MBBS, MD',
    bio: 'Decades of experience in primary care and geriatric medicine.',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Friday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
    ]
  }
];

export const USERS = [
  { id: 1, name: 'John Peterson', email: 'john@example.com', password: 'password', role: 'PATIENT' },
  { id: 2, name: 'Alice Johnson', email: 'alice@example.com', password: 'password', role: 'PATIENT' },
  { id: 3, name: 'Michael Smith', email: 'michael@example.com', password: 'password', role: 'PATIENT' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@medbook.com', password: 'password', role: 'DOCTOR', doctorId: 1 },
  { id: 5, name: 'Mike Robinson', email: 'admin@medbook.com', password: 'password', role: 'ADMIN' },
];

export const INITIAL_APPOINTMENTS = [
  { id: 1, patientId: 1, doctorId: 1, date: '2026-04-20', slotTime: '10:00', status: 'CONFIRMED', reason: 'Regular heart checkup' },
  { id: 2, patientId: 2, doctorId: 3, date: '2026-04-21', slotTime: '09:00', status: 'CONFIRMED', reason: 'Fever and cough' },
  { id: 3, patientId: 3, doctorId: 5, date: '2026-04-22', slotTime: '11:00', status: 'PENDING', reason: 'Skin rash inspection' },
  { id: 4, patientId: 1, doctorId: 4, date: '2026-04-23', slotTime: '14:30', status: 'CONFIRMED', reason: 'Knee pain follow-up' },
  { id: 5, patientId: 2, doctorId: 7, date: '2026-04-24', slotTime: '16:00', status: 'CONFIRMED', reason: 'Anxiety consultation' },
  { id: 6, patientId: 3, doctorId: 10, date: '2026-04-18', slotTime: '10:30', status: 'COMPLETED', reason: 'Seasonal allergy' },
  { id: 7, patientId: 1, doctorId: 2, date: '2026-04-17', slotTime: '12:00', status: 'COMPLETED', reason: 'Migraine session' },
  { id: 8, patientId: 2, doctorId: 8, date: '2026-04-25', slotTime: '11:30', status: 'CONFIRMED', reason: 'Abdominal pain' },
  { id: 9, patientId: 3, doctorId: 1, date: '2026-04-26', slotTime: '09:30', status: 'CONFIRMED', reason: 'Chest pain' },
  { id: 10, patientId: 1, doctorId: 3, date: '2026-04-27', slotTime: '08:30', status: 'CONFIRMED', reason: 'Child vaccination' },
];
