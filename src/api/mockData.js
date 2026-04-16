export const DEPARTMENTS = [
  { id: 1, name: 'Cardiology', description: 'Comprehensive heart and cardiovascular system care' },
  { id: 2, name: 'Neurology', description: 'Advanced brain and nervous system diagnostics' },
  { id: 3, name: 'Pediatrics', description: 'Specialized medical care for infants and children' },
  { id: 4, name: 'Orthopedics', description: 'Comprehensive musculoskeletal system treatment' },
  { id: 5, name: 'General Medicine', description: 'Primary and preventive health care services' },
  { id: 6, name: 'Dermatology', description: 'Expert care for skin, hair, and nail conditions' },
  { id: 7, name: 'Oncology', description: 'Advanced cancer diagnosis and multi-modal treatment' },
  { id: 8, name: 'Psychiatry', description: 'Holistic mental health and behavioral disorders care' },
  { id: 9, name: 'Gastroenterology', description: 'Expert care for digestive and liver diseases' },
  { id: 10, name: 'Nephrology', description: 'Comprehensive kidney care and hypertension management' },
  { id: 11, name: 'Ophthalmology', description: 'Complete eye care and surgical interventions' },
  { id: 12, name: 'ENT Specialist', description: 'Ear, Nose, and Throat diagnostic services' },
  { id: 13, name: 'Pulmonology', description: 'Respiratory system and lung health specialists' },
  { id: 14, name: 'Endocrinology', description: 'Specialized care for hormonal and metabolic disorders' },
  { id: 15, name: 'Urology', description: 'Urinary tract and male reproductive system care' },
];

export const DOCTORS = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    specialization: 'Cardiologist',
    departmentId: 1,
    experience: 12,
    qualification: 'MD, DM (Cardiology)',
    bio: 'Specialist in interventional cardiology with over 12 years of experience in complex surgeries.',
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
    bio: 'Expert in treating complex neurological disorders, migraines, and sleep disorders.',
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
    bio: 'Compassionate care for children with focus on developmental pediatrics and nutrition.',
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
    bio: 'Specialist in robotic-assisted joint replacement and advanced sports trauma medicine.',
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
    bio: 'Expert in clinical dermatology, laser treatments, and aesthetic skin care.',
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
    bio: 'Dedicated to precision oncology and immunotherapy treatments for advanced cancers.',
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
    bio: 'Focusing on clinical psychology, stress management, and adolescent behavioral health.',
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
    bio: 'Specialist in advanced endoscopy, liver disorders, and chronic digestive health.',
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
    bio: 'Expert in pediatric nephrology, kidney transplant care, and hypertension management.',
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
    bio: 'Decades of experience in community medicine, geriatric health, and primary diagnostics.',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Friday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
    ]
  },
  {
    id: 11,
    name: 'Dr. Olivia Martinez',
    specialization: 'Ophthalmologist',
    departmentId: 11,
    experience: 11,
    qualification: 'MD, MS (Ophtha)',
    bio: 'Specialist in cataract surgery, refractive errors, and retinal health.',
    availability: [
      { day: 'Monday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
      { day: 'Wednesday', startTime: '10:00', endTime: '18:00', slotDuration: 30 },
    ]
  },
  {
    id: 12,
    name: 'Dr. Thomas Shelby',
    specialization: 'ENT Specialist',
    departmentId: 12,
    experience: 16,
    qualification: 'MD (ENT)',
    bio: 'Expert in micro-ear surgery and nasal reconstruction procedures.',
    availability: [
      { day: 'Tuesday', startTime: '09:00', endTime: '15:00', slotDuration: 20 },
      { day: 'Thursday', startTime: '09:00', endTime: '15:00', slotDuration: 20 },
    ]
  },
  {
    id: 13,
    name: 'Dr. Grace Burgess',
    specialization: 'Pulmonologist',
    departmentId: 13,
    experience: 6,
    qualification: 'MD (Pulmonary)',
    bio: 'Specialist in asthma, COPD, and sleep apnea treatments.',
    availability: [
      { day: 'Wednesday', startTime: '13:00', endTime: '18:00', slotDuration: 30 },
      { day: 'Friday', startTime: '13:00', endTime: '18:00', slotDuration: 30 },
    ]
  },
  {
    id: 14,
    name: 'Dr. Arthur Dayne',
    specialization: 'Endocrinologist',
    departmentId: 14,
    experience: 13,
    qualification: 'MD, DM (Endo)',
    bio: 'Expert in diabetes management and complex metabolic disorders.',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '14:00', slotDuration: 45 },
      { day: 'Thursday', startTime: '14:00', endTime: '19:00', slotDuration: 45 },
    ]
  },
  {
    id: 15,
    name: 'Dr. Jon Snow',
    specialization: 'Urologist',
    departmentId: 15,
    experience: 8,
    qualification: 'MS, M.Ch (Urology)',
    bio: 'Specialist in minimally invasive robotic urological surgeries.',
    availability: [
      { day: 'Tuesday', startTime: '10:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Friday', startTime: '10:00', endTime: '15:00', slotDuration: 30 },
    ]
  },
  {
    id: 16,
    name: 'Dr. Arya Stark',
    specialization: 'Pediatrician',
    departmentId: 3,
    experience: 5,
    qualification: 'MD (Pediatrics)',
    bio: 'Passionate about pediatric emergency care and vaccinations.',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', slotDuration: 30 },
    ]
  },
  {
    id: 17,
    name: 'Dr. Tyrion Lannister',
    specialization: 'Neurologist',
    departmentId: 2,
    experience: 22,
    qualification: 'MD, PhD',
    bio: 'Renowned researcher in neurodegenerative diseases and cognitive health.',
    availability: [
      { day: 'Wednesday', startTime: '10:00', endTime: '14:00', slotDuration: 60 },
    ]
  },
  {
    id: 18,
    name: 'Dr. Sansa Bolton',
    specialization: 'Cardiologist',
    departmentId: 1,
    experience: 10,
    qualification: 'MD, DM',
    bio: 'Focusing on preventative cardiology and women\'s heart health.',
    availability: [
      { day: 'Tuesday', startTime: '12:00', endTime: '18:00', slotDuration: 30 },
      { day: 'Thursday', startTime: '12:00', endTime: '18:00', slotDuration: 30 },
    ]
  },
  {
    id: 19,
    name: 'Dr. Jaime Fox',
    specialization: 'Orthopedic Specialist',
    departmentId: 4,
    experience: 14,
    qualification: 'MS (Ortho)',
    bio: 'Expert in sports medicine and complex limb reconstruction.',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '15:00', slotDuration: 30 },
      { day: 'Friday', startTime: '09:00', endTime: '15:00', slotDuration: 30 },
    ]
  },
  {
    id: 20,
    name: 'Dr. Brienne Tarth',
    specialization: 'Physical Therapist',
    departmentId: 4,
    experience: 9,
    qualification: 'BPT, MPT',
    bio: 'Dedicated to post-surgical rehabilitation and chronic pain management.',
    availability: [
      { day: 'Monday', startTime: '08:00', endTime: '12:00', slotDuration: 45 },
      { day: 'Wednesday', startTime: '08:00', endTime: '12:00', slotDuration: 45 },
      { day: 'Friday', startTime: '08:00', endTime: '12:00', slotDuration: 45 },
    ]
  }
];

export const USERS = [
  { id: 1, name: 'John Peterson', email: 'john@example.com', password: 'password', role: 'PATIENT' },
  { id: 2, name: 'Alice Johnson', email: 'alice@example.com', password: 'password', role: 'PATIENT' },
  { id: 3, name: 'Michael Smith', email: 'michael@example.com', password: 'password', role: 'PATIENT' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@medbook.com', password: 'password', role: 'DOCTOR', doctorId: 1 },
  { id: 5, name: 'Mike Robinson', email: 'admin@medbook.com', password: 'password', role: 'ADMIN' },
  { id: 6, name: 'Robert Baratheon', email: 'robert@example.com', password: 'password', role: 'PATIENT' },
  { id: 7, name: 'Cersei Lannister', email: 'cersei@example.com', password: 'password', role: 'PATIENT' },
];

export const INITIAL_APPOINTMENTS = [
  { id: 1, patientId: 1, doctorId: 1, date: '2026-04-20', slotTime: '10:00', status: 'CONFIRMED', reason: 'Regular heart checkup' },
  { id: 2, patientId: 2, doctorId: 3, date: '2026-04-21', slotTime: '09:00', status: 'CONFIRMED', reason: 'Fever and cough symptoms' },
  { id: 3, patientId: 3, doctorId: 5, date: '2026-04-22', slotTime: '11:00', status: 'PENDING', reason: 'Persistent skin rash inspection' },
  { id: 4, patientId: 1, doctorId: 4, date: '2026-04-23', slotTime: '14:30', status: 'CONFIRMED', reason: 'Knee pain follow-up after surgery' },
  { id: 5, patientId: 2, doctorId: 7, date: '2026-04-24', slotTime: '16:00', status: 'CONFIRMED', reason: 'Post-trauma anxiety consultation' },
  { id: 6, patientId: 3, doctorId: 10, date: '2026-04-18', slotTime: '10:30', status: 'COMPLETED', reason: 'Seasonal allergy management' },
  { id: 7, patientId: 1, doctorId: 2, date: '2026-04-17', slotTime: '12:00', status: 'COMPLETED', reason: 'Chronic migraine session' },
  { id: 8, patientId: 2, doctorId: 8, date: '2026-04-25', slotTime: '11:30', status: 'CONFIRMED', reason: 'Recurring abdominal pain' },
  { id: 9, patientId: 3, doctorId: 1, date: '2026-04-26', slotTime: '09:30', status: 'CONFIRMED', reason: 'Minor chest discomfort' },
  { id: 10, patientId: 1, doctorId: 3, date: '2026-04-27', slotTime: '08:30', status: 'CONFIRMED', reason: 'Annual child vaccination' },
  { id: 11, patientId: 6, doctorId: 12, date: '2026-04-28', slotTime: '09:20', status: 'CONFIRMED', reason: 'Sore throat and ear blockage' },
  { id: 12, patientId: 7, doctorId: 11, date: '2026-04-29', slotTime: '10:30', status: 'CONFIRMED', reason: 'Vision blurring issues' },
  { id: 13, patientId: 1, doctorId: 14, date: '2026-04-30', slotTime: '09:45', status: 'CONFIRMED', reason: 'Hormonal balance check' },
  { id: 14, patientId: 2, doctorId: 15, date: '2026-05-01', slotTime: '14:00', status: 'CONFIRMED', reason: 'Kidney stone follow-up' },
  { id: 15, patientId: 3, doctorId: 13, date: '2026-05-02', slotTime: '13:30', status: 'CONFIRMED', reason: 'Asthma inhaler adjustment' },
  { id: 16, patientId: 6, doctorId: 19, date: '2026-05-03', slotTime: '10:00', status: 'CONFIRMED', reason: 'Shoulder injury evaluation' },
  { id: 17, patientId: 7, doctorId: 6, date: '2026-05-04', slotTime: '08:00', status: 'CONFIRMED', reason: 'Oncology screening' },
  { id: 18, patientId: 1, doctorId: 2, date: '2026-05-05', slotTime: '15:15', status: 'CONFIRMED', reason: 'Sleep disorder follow-up' },
  { id: 19, patientId: 2, doctorId: 5, date: '2026-05-06', slotTime: '09:15', status: 'CONFIRMED', reason: 'Skin rejuvenation' },
  { id: 20, patientId: 3, doctorId: 20, date: '2026-05-07', slotTime: '11:15', status: 'CONFIRMED', reason: 'Lower back physiotherapy' },
];
