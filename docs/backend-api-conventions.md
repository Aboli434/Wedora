# Wedora Backend API Conventions & Architecture Standard

This document establishes the architecture conventions, ownership rules, response contracts, and implementation roadmap for Wedora backend APIs under `/api/v1/*`.

---

## 1. Authentication & Authorization Standard

- **Authentication**: All protected endpoints must invoke `requireAuthenticatedUser()` from `@/lib/auth`. Session validity is established via Supabase Auth (`@supabase/ssr`) cookies and mapped to `User.supabaseAuthUserId` in PostgreSQL.
- **Role Authorization**: Role-restricted endpoints must invoke `requireRole(UserRole | UserRole[])`.
- **Identity Security**:
  - Request body `userId` or `role` parameters are **NEVER** trusted for authorization or ownership.
  - Ownership is derived strictly from the server-authenticated `User` database record.

---

## 2. Domain Ownership Rules

### Client Scope (`UserRole.CLIENT`)
- Owns `ClientProfile`
- Owns `Wedding` and associated `WeddingEvent` records
- Owns `Guest` list and `GuestEventAttendance`
- Owns `ChecklistTask` items
- Owns `Budget` and `Expense` records
- Manages `WeddingVendor` shortlist relationships
- Creates and manages `VendorEnquiry` messages for their weddings
- Accesses **only** their own bookings, payment records, and reviews

### Vendor Scope (`UserRole.VENDOR`)
- Owns `VendorProfile`
- Owns `VendorService` offerings
- Owns `VendorPortfolioItem` and `MediaAsset` records
- Owns `VendorAvailability` schedule
- Manages enquiries received by their vendor profile
- Manages bookings belonging to their vendor profile
- Manages calendar events and blackout dates belonging to their vendor profile
- Manages payment records for their bookings
- Responds to reviews authored for their bookings

### Admin Scope (`UserRole.ADMIN`)
- Platform-level management and auditing access
- Operations require explicit `requireRole(UserRole.ADMIN)` enforcement
- Administrative actions must never be exposed via public client or vendor endpoints

---

## 3. Request Input Validation

- All request bodies must be validated using Zod schemas (`src/lib/validation/*`) before executing persistence logic.
- Zod schemas must use `.strict()` to reject unmodifiable, unknown, or forbidden keys.
- Validation failures throw `ValidationError`, returning HTTP status `422 Unprocessable Entity` with a detailed error array.

---

## 4. Standard Response Contracts

### Success Response Contract
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional human-readable confirmation"
}
```

### Error Response Contract
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error description",
    "details": null
  }
}
```

### Error Code & HTTP Status Standard
| HTTP Status | Error Code | Description |
| :--- | :--- | :--- |
| `401` | `UNAUTHORIZED` | Authentication required or session expired |
| `403` | `FORBIDDEN` | Access denied or user account deactivated |
| `404` | `NOT_FOUND` | Requested entity does not exist |
| `409` | `CONFLICT` | Resource state conflict (e.g. duplicate reference code) |
| `422` | `VALIDATION_ERROR` | Request payload failed Zod schema validation |
| `500` | `INTERNAL_SERVER_ERROR` | Unexpected server error (sanitized for client) |

---

## 5. Data Handling Conventions

- **Monetary Storage**: Financial values are stored in PostgreSQL as `BigInt` paise (1 INR = 100 paise).
- **BigInt Serialization**: BigInt values are converted safely to string representations before JSON serialization via `serializeBigInt()`. Financial values are never converted to floating-point JavaScript numbers.
- **Date Format**: PostgreSQL `DATE` fields are formatted as `YYYY-MM-DD` strings.
- **Timestamp Format**: PostgreSQL `TIMESTAMPTZ` fields are formatted as standard ISO 8601 strings (`YYYY-MM-DDTHH:mm:ss.sssZ`).
- **Time Format**: PostgreSQL `TIME(6)` fields are formatted as `HH:mm:ss` with explicit timezone fields (default `"Asia/Kolkata"`).

---

## 6. Pagination Contract (Future List APIs)

Collection endpoints (`GET /api/v1/vendors`, `GET /api/v1/bookings`, etc.) must follow this pagination contract:

### Request Query Parameters
`GET /api/v1/resource?page=1&pageSize=20`

### Response Payload Structure
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

## 7. Planned Domain API Implementation Order

1. **Current User / Profile** (`/api/v1/me`)
2. **Wedding** (`/api/v1/weddings`)
3. **Wedding Events** (`/api/v1/weddings/:id/events`)
4. **Guests + RSVP** (`/api/v1/weddings/:id/guests`)
5. **Checklist** (`/api/v1/weddings/:id/tasks`)
6. **Budget + Expenses** (`/api/v1/weddings/:id/budget`)
7. **Vendor Directory** (`/api/v1/vendors`)
8. **Vendor Services + Portfolio** (`/api/v1/vendors/:id/services`)
9. **Vendor Enquiries + Messages** (`/api/v1/enquiries`)
10. **Wedding Vendors / Shortlist** (`/api/v1/weddings/:id/vendors`)
11. **Bookings** (`/api/v1/bookings`)
12. **Calendar + Availability** (`/api/v1/calendar`)
13. **Payments + Invoices** (`/api/v1/payments`)
14. **Reviews** (`/api/v1/reviews`)
15. **Notifications** (`/api/v1/notifications`)
16. **Activity Logs** (`/api/v1/logs`)
17. **Admin APIs** (`/api/v1/admin/*`)
