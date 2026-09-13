# API Endpoints Documentation

This document provides complete documentation and usage instructions for all HTTP endpoints available in the application.

---

## Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Global Headers](#global-headers)
- [Endpoints](#endpoints)
  - [1. Health Check](#1-health-check)
  - [2. Subscribe User](#2-subscribe-user)
  - [3. Create Issue or Feature Request](#3-create-issue-or-feature-request)
- [Error Handling](#error-handling)

---

## Overview

The API is built using **Express** running on the **Bun** runtime. It supports CORS for cross-origin requests and parses JSON payloads.

---

## Base URL

- **Local Environment:** `http://localhost:3000` (or specified server port)
- **Production / Vercel:** `https://<your-vercel-domain>.vercel.app`

---

## Global Headers

For `POST` endpoints accepting JSON input, include:

```http
Content-Type: application/json
```

---

## Endpoints

### 1. Health Check

Checks the status and runtime environment of the API service.

- **URL:** `/api/health`
- **Method:** `GET`
- **Authentication Required:** No
- **URL Parameters:** None
- **Query Parameters:** None

#### Response

##### Success Response (200 OK)

```json
{
  "status": "ok",
  "runtime": "bun"
}
```

#### Code Examples

##### cURL
```bash
curl -X GET http://localhost:3000/api/health
```

##### JavaScript (Fetch API)
```javascript
const response = await fetch('http://localhost:3000/api/health');
const data = await response.json();
console.log(data);
```

---

### 2. Subscribe User

Subscribes a user email to the newsletter/mailing list. Normalizes the email to lowercase, checks for duplicates, saves the record, and sends a welcome email via Resend.

- **URL:** `/api/v1/subscribe`
- **Method:** `POST`
- **Authentication Required:** No
- **Headers:** `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | String | Yes | Valid email address to subscribe. |

##### Request Body Example
```json
{
  "email": "user@example.com"
}
```

#### Responses

##### Success Response (201 Created)

Returned when the user is successfully subscribed.

```json
{
  "email": "user@example.com",
  "createdAt": "2023-10-25T12:34:56.789Z"
}
```

##### Validation Error Response (400 Bad Request)

Returned when the request payload fails Zod validation (e.g. invalid email syntax).

```json
{
  "error": "Validation failed",
  "details": "[{\"code\":\"invalid_string\",\"validation\":\"email\",\"message\":\"Invalid email\",\"path\":[\"email\"]}]"
}
```

##### Server / Business Error Response (500 Internal Server Error)

Returned if an unexpected error occurs or if the subscriber already exists / email fails to send.

*Example (Duplicate subscriber):*
```json
{
  "error": "Subscriber with email user@example.com already exists"
}
```

#### Code Examples

##### cURL
```bash
curl -X POST http://localhost:3000/api/v1/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

##### JavaScript (Fetch API)
```javascript
const response = await fetch('http://localhost:3000/api/v1/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com'
  }),
});
const data = await response.json();
console.log(data);
```

---

### 3. Create Issue or Feature Request

Submits a new issue or feature request.

- **URL:** `/api/v1/issues`
- **Method:** `POST`
- **Authentication Required:** No
- **Headers:** `Content-Type: application/json`

#### Request Body

| Field | Type | Required | Allowed Values / Constraints | Description |
|---|---|---|---|---|
| `type` | String | Yes | `"issues" \| "feature_request"` | The category of the submitted issue. |
| `platform` | String | Yes | Non-empty string | The platform or system affected (e.g., `"web"`, `"ios"`, `"android"`). |
| `message` | String | Yes | Non-empty string | Description of the issue or feature request. |
| `email` | String | Yes | Valid email address | Contact email address of the reporter. |

##### Request Body Example
```json
{
  "type": "issues",
  "platform": "web",
  "message": "Button does not respond to clicks on mobile safari.",
  "email": "reporter@example.com"
}
```

#### Responses

##### Success Response (201 Created)

Returned when the issue/feature request is successfully recorded.

```json
{
  "id": "b6a38f36-9b1a-4d43-8e47-d1a49f57d602",
  "type": "issues",
  "platform": "web",
  "message": "Button does not respond to clicks on mobile safari.",
  "email": "reporter@example.com",
  "createdAt": "2023-10-25T12:34:56.789Z",
  "updatedAt": "2023-10-25T12:34:56.789Z"
}
```

##### Validation Error Response (400 Bad Request)

Returned when request payload fails schema validation (e.g. invalid `type`, missing `platform`, invalid `email`).

```json
{
  "error": "Validation failed",
  "details": "[{\"code\":\"invalid_enum_value\",\"options\":[\"issues\",\"feature_request\"],\"path\":[\"type\"],\"message\":\"Invalid enum value. Expected 'issues' | 'feature_request', received 'bug'\"}]"
}
```

##### Server Error Response (500 Internal Server Error)

Returned if domain validation fails or a database operation fails.

```json
{
  "error": "bug is not a valid issue type. Must be 'issues' or 'feature_request'"
}
```

#### Code Examples

##### cURL
```bash
curl -X POST http://localhost:3000/api/v1/issues \
  -H "Content-Type: application/json" \
  -d '{
    "type": "issues",
    "platform": "web",
    "message": "Button does not respond to clicks on mobile safari.",
    "email": "reporter@example.com"
  }'
```

##### JavaScript (Fetch API)
```javascript
const response = await fetch('http://localhost:3000/api/v1/issues', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'issues',
    platform: 'web',
    message: 'Button does not respond to clicks on mobile safari.',
    email: 'reporter@example.com'
  }),
});
const data = await response.json();
console.log(data);
```

---

## Error Handling

All endpoints respond with standardized HTTP status codes:

- **200 OK**: The request succeeded.
- **201 Created**: The resource was successfully created.
- **400 Bad Request**: Request payload validation failed against the schema.
- **500 Internal Server Error**: Server or domain error occurred while processing the request.
