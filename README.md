# 🚚 Parcel Delivery System API

A feature-rich, role-based **Parcel Delivery System** built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. The system supports **JWT authentication**, **role-based authorization**, **parcel tracking**, **status logs**, and **real-time delivery updates** with delivery boy access.

---

## 🌐 [Live URL](https://parcel-delivery-system-eosin.vercel.app/)

> Deployment-ready backend for any delivery-based application.

---

## 🔧 Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT (Access & Refresh Tokens)
- bcrypt.js (Password Hashing)

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/parcel-delivery-system.git
cd parcel-delivery-system
npm install
```

### 🧪 Run Locally

```bash
npm run dev
```

### 🔐 .env Example

```env
PORT=
MONGO_URI=
NODE_ENV=

# JWT
JWT_ACCESS_TOKEN=
JWT_ACCESS_EXPIRESIN=
JWT_REFRESH_TOKEN=
JWT_REFRESH_EXPIRESIN=

# Bcrypt
BCRYPT_SALT_ROUND=

# Super Admin (Auto-generated)
SUPER_ADMIN_EMAIL=superadmin@gmail.com
SUPER_ADMIN_PASSWORD=123456789
```

---

## 🔑 Roles

- `USER`
- `RECEIVER`
- `DELIVERY_BOY`
- `ADMIN`
- `SUPER_ADMIN`

---

## 📮 API Endpoints

> Base URL: `http://localhost:5000/api/v1`

### ✅ Auth Routes

#### 🔹 Register

`POST /auth/register`

```json
{
  "name": "Zubayer Hossain",
  "email": "zubayer@example.com",
  "password": "123456",
  "role": "SENDER"
}
```

#### 🔹 Login

`POST /auth/login`

```json
{
  "email": "zubayer@example.com",
  "password": "Aa1@23456"
}
```

#### 🔹 Refresh Token

`POST /auth/refresh-token`

```json
{
  "refreshToken": "your_refresh_token"
}
```

---

### 📦 Parcel Routes

#### 🔹 Create Parcel

`POST /parcel/create`

```json
{
  "receiver": "Md Fahim",
  "phone": "01xxxxxxxxx",
  "weight": 5,
  "pickupAddress": "Dhaka",
  "destinationAddress": "Chittagong",
  "type": "box",
  "estimatedDeliveryDate": "2025-08-05"
}
```

#### 🔹 Get My Parcels (Sender/Receiver)

`GET /parcel/my-parcels`
**(Requires Auth)**

---

### 📤 Parcel Delivery Routes

#### 🔹 Update Parcel Delivery (Delivery Boy/Admin/Super Admin)

`POST /parcel/delivery/update`

```json
{
  "parcelId": "662b3ef15d31281e7aa29f12",
  "status": "Delivered",
  "Location": "Dhaka"
}
```

---

### 🔍 Admin Routes

#### 🔹 Get All Parcels

`GET /parcel/all`
**(Role: ADMIN / SUPER_ADMIN)**

#### 🔹 Filter Parcels (By status/date)

`POST /parcel/filter-parcel`

```json
{
  "status": "Delivered",
  "from": "2024-01-01",
  "to": "2024-06-30"
}
```

---

## 🔐 Protected Routes

All protected routes require a **Bearer Token**:

```http
Authorization: Bearer <access_token>
```

---

## 🛂 Middleware

- `checkAuth(...roles)` – verifies access by matching user roles.

---

## ⚠️ Error Handling

All routes follow a structured error response format:

```json
{
  "success": false,
  "message": "Error message here",
  "error": {}
}
```

---

## 👤 Author

**Zubayer Hossain Uday**

- 💼 GitHub: [@ZubayerUday](https://github.com/Uday2027)
- 📘 Facebook: [Zubayer Hossain Uday](https://facebook.com/Y0uNeverKn0w)

---

## 📃 License

This project is open source and free to use under the MIT license.

---

## 💭 Final Thoughts

This backend system was handcrafted with:

- ☕ countless cups of coffee,
- 💤 sleepy eyes at 3 AM,
- 📦 actual parcels stacked on the table (for inspiration),
- 💡 spontaneous ideas turned into endpoints,
- and 💻 a keyboard that has seen too much emotion.

If this project helped you, made you smile, or saved you a deadline — consider giving it a ⭐ on GitHub.

Remember, great software doesn’t always start with a perfect plan... sometimes it starts with a tired developer and a strong desire to just **make it work**.

---

## 🙏 Special Thanks

To all the devs who’ve ever screamed at their terminal and kept going — this one’s for you.

Stay curious. Stay building. 🚀
