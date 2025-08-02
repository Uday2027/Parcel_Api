Here is the complete `README.md` content, written in a single Markdown file — just copy and paste it:

---

````markdown
# 📦 Parcel Delivery System API

A modern backend API built with **Express.js**, **TypeScript**, and **MongoDB**, designed to manage parcel delivery operations with robust role-based access control, tracking, and lifecycle management.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Access & Refresh Tokens)
- 👥 Role-Based Access Control
  - `SUPER_ADMIN`, `ADMIN`, `SENDER`, `RECEIVER`, `DELIVERY_BOY`
- 📦 Parcel Management
  - Create, track, cancel, and filter parcels
- 🚛 Delivery Boy Workflow
  - Live delivery status updates (Pickup, Drop-off)
- 🧾 Status Logging (with timestamps, notes, and location support)
- 🛠️ User Registration & Admin Management
- 🌐 Public Parcel Tracking

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Security:** JWT, Bcrypt, RBAC
- **Validation:** Zod

---

## 🔑 User Roles & Access

| Role         | Permissions                                                    |
| ------------ | -------------------------------------------------------------- |
| SUPER_ADMIN  | Full access to all admin-level actions and user/parcel control |
| ADMIN        | Manage users and parcels                                       |
| SENDER       | Create and manage their own parcels                            |
| RECEIVER     | View received parcels                                          |
| DELIVERY_BOY | Update parcel delivery stages (Dispatched, Delivered)          |

---

## 🔐 Authentication

This API uses a secure token-based authentication system:

- **JWT Access Token**
- **JWT Refresh Token**
- Passwords hashed using **bcrypt**

---

## 🔄 Parcel Lifecycle

A parcel moves through the following statuses:

- `Requested`
- `Approved`
- `Dispatched`
- `In Transit`
- `Delivered`
- `Cancelled`

Each status change is logged with metadata (timestamp, updatedBy, note, location).

---

## 📬 API Endpoints Overview

### 🔑 Auth

- `POST /api/v1/auth/register` — Register as a user
- `POST /api/v1/auth/login` — Login and receive tokens

### 👥 User

- `POST /api/v1/user/register` — Register new user
- `POST /api/v1/user/register-admin` — Register admin (SUPER_ADMIN only)
- `GET /api/v1/user/all-users` — Get all users (ADMIN, SUPER_ADMIN)
- `PATCH /api/v1/user/:id` — Update user (Authenticated)

### 📦 Parcel

- `POST /api/v1/parcel/create` — Create new parcel (ADMIN, SENDER)
- `GET /api/v1/parcel/my` — Get own parcels (ADMIN, SENDER)
- `PATCH /api/v1/parcel/cancel/:id` — Cancel parcel (ADMIN, SENDER, SUPER_ADMIN)
- `GET /api/v1/parcel/all-parcel` — Get all parcels (ADMIN, SUPER_ADMIN)
- `GET /api/v1/parcel/track/:trackingId` — Track parcel publicly
- `PATCH /api/v1/parcel/status/:id` — Update parcel status (ADMIN, SUPER_ADMIN)
- `POST /api/v1/parcel/delivery/update` — Delivery boy updates (DELIVERY_BOY)

---

## 📦 Delivery Boy Parcel Update Example

**Endpoint:** `POST /api/v1/parcel/delivery/update`  
**Access:** `DELIVERY_BOY`, `ADMIN`, `SUPER_ADMIN`

**Request Body:**

```json
{
  "parcelId": "64c889fce24a1e1234567890",
  "status": "Delivered",
  "note": "Parcel handed to recipient at the door",
  "location": "Dhaka, Bangladesh"
}
```
````

---

## 🧪 Getting Started Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/parcel-delivery-system.git
cd parcel-delivery-system
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create `.env` File

Create a `.env` file in the root of the project and paste the following:

```env
PORT=
MONGO_URI=mongodb.....................
NODE_ENV=

# JWT
JWT_ACCESS_TOKEN=
JWT_ACCESS_EXPIRESIN=
JWT_REFRESH_TOKEN=
JWT_REFRESH_EXPIRESIN=

# BCRYPT
BCRYPT_SALT_ROUND=

# Super Admin Credentials
SUPER_ADMIN_EMAIL=
SUPER_ADMIN_PASSWORD=
```

### 4️⃣ Start the Server

```bash
npm run dev
```

> Server will be running at `http://localhost:5000`

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) for API testing.

Recommended collections:

- ✅ Authentication: Register, Login, Token refresh
- 📦 Parcel: Create, update, cancel, track
- 🛡️ Role-based: User access tests
- 🚚 Delivery: Parcel delivery updates

---

## 🧑‍💻 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/awesome-feature`
3. Commit your changes: `git commit -m 'feat: add awesome feature'`
4. Push to the branch: `git push origin feature/awesome-feature`
5. Open a pull request 🚀

---

## 🧾 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Zubayer Hossain Uday**

- 💼 GitHub: [@ZubayerUday](https://github.com/Uday2027)
- 📘 Facebook: [Zubayer Hossain Uday](https://facebook.com/Y0uNeverKn0w)

---
