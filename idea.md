# 🏥 MedBook — Clinic Appointment Booking System

## Problem Statement

In many small-to-mid-sized clinics, appointment scheduling is still handled via phone calls or walk-ins, leading to long wait times, double bookings, and poor patient experience. Doctors have no centralized view of their schedule, and clinic administrators lack visibility into operational metrics.

**MedBook** solves this by providing a digital platform where patients can discover doctors, book appointments, receive notifications, and manage their medical history — while doctors and admins get powerful dashboards to manage schedules, availability, and clinic operations.

---

## Target Users

| Role        | Description                                                      |
| ----------- | ---------------------------------------------------------------- |
| **Patient** | Registers, searches doctors, books/cancels appointments          |
| **Doctor**  | Manages availability, views appointments, writes prescriptions   |
| **Admin**   | Manages users, doctors, departments, views reports & system logs |

---

## Scope

- Multi-role authentication and authorization (JWT + Role-based)
- Doctor discovery with filters (specialization, department, availability)
- Appointment booking with slot management and conflict prevention
- Prescription management tied to appointments
- Notification system (email/in-app) for booking confirmations, reminders, and cancellations
- Admin dashboard for user management, department CRUD, and system reports
- Logging, validation, and centralized exception handling across the backend

---

## Key Features (Backend 75% Focus)

### 🔐 Authentication & Authorization
- JWT-based stateless authentication
- Role-based access control (Patient, Doctor, Admin)
- Password hashing with BCrypt
- Refresh token rotation
- **Design Pattern:** Singleton (Security Context), Strategy (Auth provider abstraction)

### 📋 Appointment Management
- Slot-based booking with conflict detection
- Status lifecycle: `PENDING → CONFIRMED → COMPLETED / CANCELLED / NO_SHOW`
- Automatic slot availability recalculation on cancellation
- **Design Pattern:** State Pattern (appointment status transitions)

### 👨‍⚕️ Doctor & Schedule Management
- Doctor profiles with specialization & department linkage
- Weekly recurring availability slots (configurable per doctor)
- Leave/block-date management
- **Design Pattern:** Factory (slot generation)

### 💊 Prescription Management
- Doctors can create prescriptions linked to completed appointments
- Patients can view their prescription history

### 🔔 Notification System
- Event-driven notifications on booking, cancellation, and reminders
- Supports Email and In-App notification channels
- **Design Pattern:** Observer (event listeners), Strategy (notification channel selection)

### 📊 Admin Dashboard & Reports
- CRUD for departments and doctor assignments
- View system-wide appointment statistics
- User account management (activate/deactivate)

### 🛡️ Cross-Cutting Concerns
- **Validation:** Jakarta Bean Validation on all DTOs
- **Logging:** SLF4J + Logback, structured logging with correlation IDs (Singleton logger)
- **Exception Handling:** Global `@ControllerAdvice` with custom exception hierarchy
- **Auditing:** `createdAt`, `updatedAt`, `createdBy` on all entities via JPA auditing

---

## Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| **Frontend** | React.js + Axios + React Router + Tailwind CSS  |
| **Backend**  | Java 17 + Spring Boot 3 + Spring Security       |
| **ORM**      | Spring Data JPA (Hibernate)                     |
| **Database** | PostgreSQL                                      |
| **Auth**     | JWT (jjwt library) + BCrypt                     |
| **Logging**  | SLF4J + Logback                                 |
| **Docs**     | Swagger / SpringDoc OpenAPI                     |
| **Build**    | Maven                                           |
| **Testing**  | JUnit 5 + Mockito                               |

---

## API Modules

| # | Module               | Base Path              | Key Endpoints                                                 |
|---|----------------------|------------------------|---------------------------------------------------------------|
| 1 | **Auth**             | `/api/auth`            | `POST /register`, `POST /login`, `POST /refresh-token`       |
| 2 | **User**             | `/api/users`           | `GET /me`, `PUT /me`, `GET /{id}` (admin)                    |
| 3 | **Doctor**           | `/api/doctors`         | `GET /`, `GET /{id}`, `GET /search`, `PUT /{id}/availability`|
| 4 | **Department**       | `/api/departments`     | `CRUD` operations (Admin only)                                |
| 5 | **Appointment**      | `/api/appointments`    | `POST /`, `GET /my`, `PUT /{id}/cancel`, `PUT /{id}/complete`|
| 6 | **Prescription**     | `/api/prescriptions`   | `POST /`, `GET /appointment/{id}`, `GET /my`                 |
| 7 | **Notification**     | `/api/notifications`   | `GET /my`, `PUT /{id}/read`, `GET /unread-count`             |
| 8 | **Admin**            | `/api/admin`           | `GET /users`, `PUT /users/{id}/status`, `GET /reports`       |

---

## Architecture Overview

```
┌──────────────┐     ┌──────────────────────────────────────────────────┐
│              │     │                 Spring Boot Backend              │
│   React.js   │────▶│  Controller → Service → Repository → Database   │
│   Frontend   │◀────│                                                  │
│              │     │  Security Filters ─┬─ JWT Filter                │
└──────────────┘     │                    └─ Role-based Access          │
                     │                                                  │
                     │  Cross-Cutting: Logging │ Validation │ Exception │
                     └──────────────────────────────────────────────────┘
                                          │
                                    ┌─────▼─────┐
                                    │ PostgreSQL │
                                    └───────────┘
```

---

## OOP Principles Applied

| Principle                    | Where Applied                                                        |
| ---------------------------- | -------------------------------------------------------------------- |
| **Encapsulation**            | DTOs separate internal entity state from API contracts               |
| **Abstraction**              | Service interfaces abstract business logic from controllers          |
| **Inheritance**              | Base `AuditableEntity` class for common fields; exception hierarchy  |
| **Polymorphism**             | `NotificationStrategy` interface with Email/InApp implementations    |
| **Single Responsibility**    | Each class has one reason to change (Controller ≠ Service ≠ Repo)    |
| **Open/Closed**              | New notification channels added without modifying existing code      |
| **Dependency Inversion**     | Controllers depend on service interfaces, not concrete classes       |

---

## Design Patterns Used

| Pattern       | Usage                                                          |
| ------------- | -------------------------------------------------------------- |
| **Singleton** | Logger instance, Security context holder                       |
| **Factory**   | `SlotFactory` generates time slots from doctor availability    |
| **Strategy**  | `NotificationStrategy` — Email vs In-App notification dispatch |
| **Observer**   | `AppointmentEventListener` reacts to booking/cancellation events |
| **Builder**   | Building complex DTOs and response objects                     |
| **Repository**| Spring Data JPA repository pattern for data access             |

---

## Future Enhancements

- 💳 **Payment Integration** — Razorpay/Stripe for appointment fees
- 📱 **Mobile App** — React Native companion app
- 🤖 **AI Symptom Checker** — Pre-appointment symptom triage
- 📹 **Telemedicine** — Video consultation via WebRTC
- 📈 **Analytics Dashboard** — Doctor performance & revenue metrics
- 🔄 **Recurring Appointments** — Follow-up scheduling automation
- 🏥 **Multi-Clinic Support** — SaaS model for multiple clinics
