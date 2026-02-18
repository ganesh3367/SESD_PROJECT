# 🔄 Sequence Diagram — MedBook

## Rendered Diagram

![Sequence Diagram](diagrams/sequence_diagram.png)

---

## Main End-to-End Flow

**Flow:** Patient Registers → Logs In → Searches Doctor → Books Appointment → Doctor Completes & Writes Prescription → Notifications Sent

This diagram traces the complete lifecycle from patient onboarding to appointment completion, showing the **Controller → Service → Repository → DB** layering at each step.

---

## Sequence Diagram (Mermaid)

```mermaid
sequenceDiagram
    actor Patient
    actor Doctor
    participant AuthCtrl as AuthController
    participant AuthSvc as AuthService
    participant UserRepo as UserRepository
    participant DB as PostgreSQL
    participant JWTUtil as JWTUtil
    participant DoctorCtrl as DoctorController
    participant DoctorSvc as DoctorService
    participant DoctorRepo as DoctorRepository
    participant ApptCtrl as AppointmentController
    participant ApptSvc as AppointmentService
    participant SlotFactory as SlotFactory
    participant ApptRepo as AppointmentRepository
    participant PresCtrl as PrescriptionController
    participant PresSvc as PrescriptionService
    participant PresRepo as PrescriptionRepository
    participant NotifSvc as NotificationService
    participant NotifStrategy as NotificationStrategy
    participant NotifRepo as NotificationRepository

    Note over Patient, DB: ═══ PHASE 1: PATIENT REGISTRATION ═══

    Patient ->>+ AuthCtrl: POST /api/auth/register (name, email, password)
    AuthCtrl ->>+ AuthSvc: register(RegisterDTO)
    AuthSvc ->> AuthSvc: validate input & check duplicate email
    AuthSvc ->> AuthSvc: hash password (BCrypt)
    AuthSvc ->>+ UserRepo: save(User)
    UserRepo ->>+ DB: INSERT INTO users
    DB -->>- UserRepo: user record
    UserRepo -->>- AuthSvc: savedUser
    AuthSvc -->>- AuthCtrl: RegisterResponseDTO
    AuthCtrl -->>- Patient: 201 Created {userId, message}

    Note over Patient, DB: ═══ PHASE 2: PATIENT LOGIN ═══

    Patient ->>+ AuthCtrl: POST /api/auth/login (email, password)
    AuthCtrl ->>+ AuthSvc: login(LoginDTO)
    AuthSvc ->>+ UserRepo: findByEmail(email)
    UserRepo ->>+ DB: SELECT * FROM users WHERE email = ?
    DB -->>- UserRepo: user record
    UserRepo -->>- AuthSvc: User
    AuthSvc ->> AuthSvc: verify password (BCrypt.matches)
    AuthSvc ->>+ JWTUtil: generateToken(userId, role)
    JWTUtil -->>- AuthSvc: JWT accessToken + refreshToken
    AuthSvc -->>- AuthCtrl: LoginResponseDTO
    AuthCtrl -->>- Patient: 200 OK {accessToken, refreshToken, role}

    Note over Patient, DB: ═══ PHASE 3: SEARCH DOCTORS ═══

    Patient ->>+ DoctorCtrl: GET /api/doctors/search?specialization=Cardiology
    DoctorCtrl ->>+ DoctorSvc: searchDoctors(filters)
    DoctorSvc ->>+ DoctorRepo: findBySpecializationAndDepartment(filters)
    DoctorRepo ->>+ DB: SELECT * FROM doctors JOIN departments ...
    DB -->>- DoctorRepo: doctor list
    DoctorRepo -->>- DoctorSvc: List<Doctor>
    DoctorSvc -->>- DoctorCtrl: List<DoctorResponseDTO>
    DoctorCtrl -->>- Patient: 200 OK [doctors]

    Note over Patient, DB: ═══ PHASE 4: VIEW AVAILABLE SLOTS ═══

    Patient ->>+ DoctorCtrl: GET /api/doctors/{id}/slots?date=2026-02-20
    DoctorCtrl ->>+ DoctorSvc: getAvailableSlots(doctorId, date)
    DoctorSvc ->>+ DoctorRepo: findAvailability(doctorId, dayOfWeek)
    DoctorRepo ->>+ DB: SELECT * FROM doctor_availability
    DB -->>- DoctorRepo: availability config
    DoctorRepo -->>- DoctorSvc: DoctorAvailability
    DoctorSvc ->>+ SlotFactory: generateSlots(availability, date)
    SlotFactory -->>- DoctorSvc: List<TimeSlot>
    DoctorSvc ->>+ ApptRepo: findBookedSlots(doctorId, date)
    ApptRepo ->>+ DB: SELECT time_slot FROM appointments WHERE ...
    DB -->>- ApptRepo: booked slots
    ApptRepo -->>- DoctorSvc: List<TimeSlot>
    DoctorSvc ->> DoctorSvc: filter out booked slots
    DoctorSvc -->>- DoctorCtrl: List<AvailableSlotDTO>
    DoctorCtrl -->>- Patient: 200 OK [available slots]

    Note over Patient, DB: ═══ PHASE 5: BOOK APPOINTMENT ═══

    Patient ->>+ ApptCtrl: POST /api/appointments {doctorId, date, slotTime}
    ApptCtrl ->>+ ApptSvc: bookAppointment(BookingDTO, patientId)
    ApptSvc ->> ApptSvc: validate slot availability
    ApptSvc ->>+ ApptRepo: existsByDoctorAndDateAndSlot(doctorId, date, slot)
    ApptRepo ->>+ DB: SELECT COUNT(*) FROM appointments WHERE ...
    DB -->>- ApptRepo: count
    ApptRepo -->>- ApptSvc: boolean (conflict check)
    ApptSvc ->>+ ApptRepo: save(Appointment{status=CONFIRMED})
    ApptRepo ->>+ DB: INSERT INTO appointments
    DB -->>- ApptRepo: appointment record
    ApptRepo -->>- ApptSvc: savedAppointment

    ApptSvc ->>+ NotifSvc: sendBookingConfirmation(appointment)
    NotifSvc ->>+ NotifStrategy: send(notification) [Email Channel]
    NotifStrategy -->>- NotifSvc: sent
    NotifSvc ->>+ NotifRepo: save(Notification)
    NotifRepo ->>+ DB: INSERT INTO notifications
    DB -->>- NotifRepo: saved
    NotifRepo -->>- NotifSvc: Notification
    NotifSvc -->>- ApptSvc: notified

    ApptSvc -->>- ApptCtrl: AppointmentResponseDTO
    ApptCtrl -->>- Patient: 201 Created {appointmentId, status, doctor, dateTime}

    Note over Doctor, DB: ═══ PHASE 6: DOCTOR COMPLETES APPOINTMENT ═══

    Doctor ->>+ ApptCtrl: PUT /api/appointments/{id}/complete
    ApptCtrl ->>+ ApptSvc: completeAppointment(appointmentId, doctorId)
    ApptSvc ->>+ ApptRepo: findById(appointmentId)
    ApptRepo ->>+ DB: SELECT * FROM appointments WHERE id = ?
    DB -->>- ApptRepo: appointment
    ApptRepo -->>- ApptSvc: Appointment
    ApptSvc ->> ApptSvc: validate ownership & status transition
    ApptSvc ->>+ ApptRepo: save(Appointment{status=COMPLETED})
    ApptRepo ->>+ DB: UPDATE appointments SET status = 'COMPLETED'
    DB -->>- ApptRepo: updated
    ApptRepo -->>- ApptSvc: updatedAppointment
    ApptSvc -->>- ApptCtrl: AppointmentResponseDTO
    ApptCtrl -->>- Doctor: 200 OK {status: COMPLETED}

    Note over Doctor, DB: ═══ PHASE 7: DOCTOR WRITES PRESCRIPTION ═══

    Doctor ->>+ PresCtrl: POST /api/prescriptions {appointmentId, medicines, notes}
    PresCtrl ->>+ PresSvc: createPrescription(PrescriptionDTO, doctorId)
    PresSvc ->> PresSvc: validate appointment is COMPLETED
    PresSvc ->>+ PresRepo: save(Prescription)
    PresRepo ->>+ DB: INSERT INTO prescriptions + prescription_medicines
    DB -->>- PresRepo: saved
    PresRepo -->>- PresSvc: Prescription

    PresSvc ->>+ NotifSvc: sendPrescriptionNotification(patientId)
    NotifSvc ->>+ NotifStrategy: send(notification) [In-App Channel]
    NotifStrategy -->>- NotifSvc: sent
    NotifSvc ->>+ NotifRepo: save(Notification)
    NotifRepo ->>+ DB: INSERT INTO notifications
    DB -->>- NotifRepo: saved
    NotifRepo -->>- NotifSvc: Notification
    NotifSvc -->>- PresSvc: notified

    PresSvc -->>- PresCtrl: PrescriptionResponseDTO
    PresCtrl -->>- Doctor: 201 Created {prescriptionId, medicines}
```

---

## Flow Summary

| Phase | Action                     | Layers Involved                                  |
|-------|----------------------------|--------------------------------------------------|
| 1     | Patient Registration       | AuthController → AuthService → UserRepository    |
| 2     | Patient Login (JWT)        | AuthController → AuthService → JWTUtil           |
| 3     | Search Doctors             | DoctorController → DoctorService → DoctorRepo    |
| 4     | View Available Slots       | DoctorController → DoctorService → SlotFactory   |
| 5     | Book Appointment           | ApptController → ApptService → ApptRepo + Notif  |
| 6     | Complete Appointment       | ApptController → ApptService → ApptRepo          |
| 7     | Write Prescription         | PresController → PresSvc → PresRepo + Notif      |

---

## Design Patterns Visible in This Flow

| Pattern      | Where                                                                    |
|--------------|--------------------------------------------------------------------------|
| **Factory**  | `SlotFactory.generateSlots()` creates time slot objects from config      |
| **Strategy** | `NotificationStrategy` dispatches via Email or In-App channel            |
| **Observer** | Appointment events trigger notification side-effects                     |
| **Singleton**| Logger and SecurityContext used across all layers (not shown for brevity) |
| **Repository**| Spring Data JPA repositories abstract database queries                  |
