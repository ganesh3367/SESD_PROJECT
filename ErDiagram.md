# 🗄️ ER Diagram — MedBook

## Rendered Diagram

![ER Diagram](diagrams/er_diagram.png)

---

## Overview

This Entity-Relationship diagram represents the complete database schema for MedBook, including all tables, primary/foreign keys, data types, constraints, and cardinalities. Join tables are used for many-to-many relationships.

---

## ER Diagram (Mermaid)

```mermaid
erDiagram
    USERS {
        bigint id PK
        varchar name "NOT NULL"
        varchar email "UNIQUE, NOT NULL"
        varchar password_hash "NOT NULL"
        varchar phone "NULL"
        enum role "PATIENT | DOCTOR | ADMIN"
        boolean active "DEFAULT true"
        timestamp created_at "NOT NULL"
        timestamp updated_at "NOT NULL"
        varchar created_by "NULL"
    }

    DEPARTMENTS {
        bigint id PK
        varchar name "UNIQUE, NOT NULL"
        text description "NULL"
        boolean active "DEFAULT true"
        timestamp created_at "NOT NULL"
        timestamp updated_at "NOT NULL"
    }

    DOCTORS {
        bigint id PK
        bigint user_id FK "UNIQUE → USERS.id"
        bigint department_id FK "→ DEPARTMENTS.id"
        varchar specialization "NOT NULL"
        varchar qualification "NOT NULL"
        int experience_years "DEFAULT 0"
        text bio "NULL"
        timestamp created_at "NOT NULL"
        timestamp updated_at "NOT NULL"
    }

    DOCTOR_AVAILABILITY {
        bigint id PK
        bigint doctor_id FK "→ DOCTORS.id"
        enum day_of_week "MON-SUN"
        time start_time "NOT NULL"
        time end_time "NOT NULL"
        int slot_duration_minutes "DEFAULT 30"
        timestamp created_at "NOT NULL"
        timestamp updated_at "NOT NULL"
    }

    BLOCKED_DATES {
        bigint id PK
        bigint doctor_id FK "→ DOCTORS.id"
        date blocked_date "NOT NULL"
        varchar reason "NULL"
        timestamp created_at "NOT NULL"
    }

    APPOINTMENTS {
        bigint id PK
        bigint patient_id FK "→ USERS.id"
        bigint doctor_id FK "→ DOCTORS.id"
        date appointment_date "NOT NULL"
        time slot_time "NOT NULL"
        enum status "PENDING | CONFIRMED | COMPLETED | CANCELLED | NO_SHOW"
        text reason_for_visit "NULL"
        text cancellation_reason "NULL"
        timestamp created_at "NOT NULL"
        timestamp updated_at "NOT NULL"
    }

    PRESCRIPTIONS {
        bigint id PK
        bigint appointment_id FK "UNIQUE → APPOINTMENTS.id"
        bigint doctor_id FK "→ DOCTORS.id"
        bigint patient_id FK "→ USERS.id"
        text diagnosis "NOT NULL"
        text notes "NULL"
        timestamp created_at "NOT NULL"
        timestamp updated_at "NOT NULL"
    }

    PRESCRIPTION_MEDICINES {
        bigint id PK
        bigint prescription_id FK "→ PRESCRIPTIONS.id"
        varchar medicine_name "NOT NULL"
        varchar dosage "NOT NULL"
        varchar frequency "NOT NULL, e.g. 'Twice daily'"
        int duration_days "NOT NULL"
        text instructions "NULL"
    }

    NOTIFICATIONS {
        bigint id PK
        bigint user_id FK "→ USERS.id"
        varchar title "NOT NULL"
        text message "NOT NULL"
        enum type "BOOKING_CONFIRMATION | APPOINTMENT_REMINDER | CANCELLATION_NOTICE | PRESCRIPTION_READY"
        enum channel "EMAIL | IN_APP"
        boolean is_read "DEFAULT false"
        timestamp sent_at "NOT NULL"
        timestamp created_at "NOT NULL"
    }

    REFRESH_TOKENS {
        bigint id PK
        bigint user_id FK "→ USERS.id"
        varchar token "UNIQUE, NOT NULL"
        timestamp expires_at "NOT NULL"
        boolean revoked "DEFAULT false"
        timestamp created_at "NOT NULL"
    }

    %% ============================================================
    %% RELATIONSHIPS
    %% ============================================================

    USERS ||--o| DOCTORS : "has doctor profile"
    DEPARTMENTS ||--o{ DOCTORS : "contains"
    DOCTORS ||--o{ DOCTOR_AVAILABILITY : "has weekly"
    DOCTORS ||--o{ BLOCKED_DATES : "blocks dates"
    USERS ||--o{ APPOINTMENTS : "books (as patient)"
    DOCTORS ||--o{ APPOINTMENTS : "receives"
    APPOINTMENTS ||--o| PRESCRIPTIONS : "results in"
    PRESCRIPTIONS ||--o{ PRESCRIPTION_MEDICINES : "contains"
    DOCTORS ||--o{ PRESCRIPTIONS : "writes"
    USERS ||--o{ PRESCRIPTIONS : "receives (as patient)"
    USERS ||--o{ NOTIFICATIONS : "receives"
    USERS ||--o{ REFRESH_TOKENS : "has"
```

---

## Table Summary

| Table                    | Description                                          | Key Relationships                    |
|--------------------------|------------------------------------------------------|--------------------------------------|
| `USERS`                  | All system users (patients, doctors, admins)          | PK: `id`                            |
| `DEPARTMENTS`            | Hospital/clinic departments                          | PK: `id`                            |
| `DOCTORS`                | Doctor profiles linked to users                      | FK: `user_id`, `department_id`       |
| `DOCTOR_AVAILABILITY`    | Recurring weekly time slots per doctor               | FK: `doctor_id`                      |
| `BLOCKED_DATES`          | Dates when doctor is unavailable                     | FK: `doctor_id`                      |
| `APPOINTMENTS`           | Patient-doctor appointments                          | FK: `patient_id`, `doctor_id`        |
| `PRESCRIPTIONS`          | Prescriptions for completed appointments             | FK: `appointment_id`, `doctor_id`, `patient_id` |
| `PRESCRIPTION_MEDICINES` | Individual medicines in a prescription               | FK: `prescription_id`               |
| `NOTIFICATIONS`          | User notifications (email & in-app)                  | FK: `user_id`                        |
| `REFRESH_TOKENS`         | JWT refresh tokens for session management            | FK: `user_id`                        |

---

## Cardinalities Explained

| Relationship                        | Cardinality  | Explanation                                              |
|-------------------------------------|-------------|----------------------------------------------------------|
| Users → Doctors                     | `1 : 0..1`  | A user may optionally have a doctor profile              |
| Departments → Doctors              | `1 : 0..*`  | A department can have many doctors                       |
| Doctors → DoctorAvailability       | `1 : 0..*`  | A doctor has multiple weekly availability entries         |
| Doctors → BlockedDates             | `1 : 0..*`  | A doctor can block multiple dates                        |
| Users → Appointments (patient)     | `1 : 0..*`  | A patient can have many appointments                     |
| Doctors → Appointments             | `1 : 0..*`  | A doctor can have many appointments                      |
| Appointments → Prescriptions       | `1 : 0..1`  | An appointment may result in one prescription            |
| Prescriptions → PrescriptionMedicines | `1 : 1..*` | A prescription has at least one medicine               |
| Users → Notifications              | `1 : 0..*`  | A user can receive many notifications                    |
| Users → RefreshTokens              | `1 : 0..*`  | A user can have multiple active refresh tokens           |

---

## Constraints & Indexes

| Constraint Type         | Table              | Column(s)                                  | Description                                      |
|------------------------|--------------------|--------------------------------------------|--------------------------------------------------|
| **UNIQUE**             | USERS              | `email`                                    | No duplicate email addresses                     |
| **UNIQUE**             | DOCTORS            | `user_id`                                  | One doctor profile per user                      |
| **UNIQUE**             | DEPARTMENTS        | `name`                                     | No duplicate department names                    |
| **UNIQUE**             | PRESCRIPTIONS      | `appointment_id`                           | One prescription per appointment                 |
| **UNIQUE**             | REFRESH_TOKENS     | `token`                                    | Token uniqueness                                 |
| **UNIQUE COMPOSITE**   | APPOINTMENTS       | `doctor_id`, `appointment_date`, `slot_time`| Prevent double-booking same slot                |
| **UNIQUE COMPOSITE**   | DOCTOR_AVAILABILITY| `doctor_id`, `day_of_week`                 | One config per day per doctor                    |
| **INDEX**              | APPOINTMENTS       | `patient_id`                               | Fast lookup by patient                           |
| **INDEX**              | APPOINTMENTS       | `doctor_id`, `appointment_date`            | Fast schedule lookup                             |
| **INDEX**              | NOTIFICATIONS      | `user_id`, `is_read`                       | Fast unread count query                          |
| **CHECK**              | DOCTOR_AVAILABILITY| `start_time < end_time`                    | Valid time range                                 |
| **CHECK**              | APPOINTMENTS       | `status IN (...)`                          | Valid status values only                         |
