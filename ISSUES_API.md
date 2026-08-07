# Issues API Documentation

This document describes the specification, usage, validation rules, and integration examples for the Issues API endpoint in the `subscriber-api` system.

---

## Endpoint Overview

The Issues API allows clients to report bugs or request new features. The system validates the inputs, normalizes the submitted emails, and saves them securely via the Issue Repository.

* **Endpoint**: `/api/v1/issues`
* **HTTP Method**: `POST`
* **Content-Type**: `application/json`

---

## Request Payload

The request body must be a JSON object containing the following parameters:

| Field | Type | Required | Description / Constraints |
| :--- | :--- | :--- | :--- |
| `type` | `string` | **Yes** | Must be exactly either `'issues'` (for bug reports) or `'feature_request'` (for feature requests). |
| `platform` | `string` | **Yes** | The application platform where the issue or feature request is raised (e.g., `"iOS App"`, `"Android App"`, `"Web App"`). Cannot be empty or whitespace-only. |
| `message` | `string` | **Yes** | A detailed description of the issue or feature suggestion. Cannot be empty or whitespace-only. |
| `email` | `string` | **Yes** | A valid email address. The system will automatically trim whitespace and convert the email to lowercase. |

### Example Payload

```json
{
  "type": "issues",
  "platform": "iOS App",
  "message": "The application crashes immediately upon tapping the 'Subscribe' button.",
  "email": "USER@Example.Com"
}
```

---

## Response Formats

### 1. Success Response (`201 Created`)

Returned when the issue/feature request is successfully validated and persisted.

#### Headers
* `Content-Type: application/json`

#### Response Body
```json
{
  "id": "e67b2d5d-c6a2-4a0b-8d07-ee64bfd4e0a9",
  "type": "issues",
  "platform": "iOS App",
  "message": "The application crashes immediately upon tapping the 'Subscribe' button.",
  "email": "user@example.com",
  "createdAt": "2023-10-27T14:32:01.000Z",
  "updatedAt": "2023-10-27T14:32:01.000Z"
}
```

*Note: The email returned is normalized to lowercase.*

---

### 2. Validation Error Response (`400 Bad Request`)

Returned when the payload fails schema validation (handled by Zod) or domain rule validation.

#### Headers
* `Content-Type: application/json`

#### Example Schema Validation Failures

**Missing field or invalid email:**
```json
{
  "error": "Validation failed",
  "details": "[\n  {\n    \"validation\": \"email\",\n    \"code\": \"invalid_string\",\n    \"message\": \"Invalid email address\",\n    \"path\": [\n      \"email\"\n    ]\n  }\n]"
}
```

**Invalid enum type:**
```json
{
  "error": "Validation failed",
  "details": "[\n  {\n    \"received\": \"invalid_type\",\n    \"code\": \"invalid_enum_value\",\n    \"options\": [\n      \"issues\",\n      \"feature_request\"\n    ],\n    \"path\": [\n      \"type\"\n    ],\n    \"message\": \"Invalid enum value. Expected 'issues' | 'feature_request', received 'invalid_type'\"\n  }\n]"
}
```

---

### 3. Internal Server Error (`500 Internal Server Error`)

Returned when an unexpected error occurs on the server.

#### Headers
* `Content-Type: application/json`

#### Response Body
```json
{
  "error": "Detailed description of the server error"
}
```

---

## Code Examples

### 1. Using `curl`

To submit a bug report via terminal:

```bash
curl -X POST http://localhost:3000/api/v1/issues \
  -H "Content-Type: application/json" \
  -d '{
    "type": "issues",
    "platform": "Web App",
    "message": "Dark mode toggling does not persist across page reloads.",
    "email": "support@example.com"
  }'
```

To submit a feature request:

```bash
curl -X POST http://localhost:3000/api/v1/issues \
  -H "Content-Type: application/json" \
  -d '{
    "type": "feature_request",
    "platform": "Android App",
    "message": "Please add support for biometric login (fingerprint/FaceID).",
    "email": "beta-tester@example.com"
  }'
```

### 2. Using JavaScript / TypeScript (`fetch`)

```typescript
async function submitIssue() {
  const url = 'http://localhost:3000/api/v1/issues';
  const payload = {
    type: 'issues',
    platform: 'Android App',
    message: 'Bluetooth connection drops when device screen turns off.',
    email: 'user.test@example.com'
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Issue submitted successfully:', data);
    } else {
      const errorData = await response.json();
      console.error('Validation or client error:', errorData);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}
```

---

## Architecture Overview

The Issues API endpoint is designed following **Clean Architecture** principles:

1. **Routing (`src/infrastructure/http/app.ts`)**: Binds `POST /api/v1/issues` to the `IssueController`.
2. **Controller (`src/infrastructure/http/controllers/issue.controller.ts`)**:
   - Parses and validates request body using Zod schema `createIssueRequest`.
   - Delegates work to `CreateIssueUseCase`.
3. **Request DTO (`src/infrastructure/http/requests/issue/create-issue.request.ts`)**: Defines Zod validation rules.
4. **Use Case (`src/application/use-cases/create-issue.use-case.ts`)**: Coordinates creation of domain models and persisting via repository interface.
5. **Domain Entity (`src/domain/entities/issue.ts`)**: Enforces domain-level business rules and constraints (e.g., email format, valid type, trimming white spaces).
6. **Repository (`src/domain/repositories/issue-repository.interface.ts` & `src/infrastructure/database/repositories/`)**: Abstracts details of persisting data in PostgreSQL via Drizzle ORM.
