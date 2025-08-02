````md
# 🚚 Parcel Delivery System API

A feature-rich, role-based **Parcel Delivery System** built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. It supports **JWT authentication**, **role-based authorization**, **real-time parcel tracking**, and **automated delivery updates**.

---

## 🌐 [Live URL](https://parcel-delivery-system-eosin.vercel.app/)

> Fully functional backend, designed to power modern delivery platforms.

---

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** with Mongoose
- **JWT Authentication**
- **bcryptjs** (for hashing passwords)

---

## 📦 Installation

```bash
git clone https://github.com/your-username/parcel-delivery-system.git
cd parcel-delivery-system
npm install
```
````

### 🧪 Run the Project Locally

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root and configure:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/parcelDelivery

# JWT
JWT_ACCESS_TOKEN=youraccesstoken
JWT_ACCESS_EXPIRESIN=1h
JWT_REFRESH_TOKEN=yourrefreshtoken
JWT_REFRESH_EXPIRESIN=7d

# BCRYPT
BCRYPT_SALT_ROUND=10

# SUPER ADMIN
SUPER_ADMIN_EMAIL=superadmin@gmail.com
SUPER_ADMIN_PASSWORD=123456789
```

---

## 🎭 User Roles

- **SENDER**
- **RECEIVER**
- **DELIVERY_BOY**
- **ADMIN**
- **SUPER_ADMIN**

---

## 📮 API Endpoints

> Base URL: `http://localhost:5000/api/v1`

### ✅ Auth Routes

#### 🔹 Register

`POST /auth/register`

Registers a new user with role.

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

Authenticates user and returns access and refresh tokens.

```json
{
  "email": "zubayer@example.com",
  "password": "123456"
}
```

#### 🔹 Refresh Token

`POST /auth/refresh-token`

```json
{
  "refreshToken": "your_refresh_token_here"
}
```

---

### 📦 Parcel Routes

#### 🔹 Create Parcel

`POST /parcel/create`
**(Role: SENDER)**

```json
{
  "receiver": "Md Fahim",
  "phone": "01700000000",
  "weight": 5,
  "pickupAddress": "Dhaka",
  "destinationAddress": "Chittagong",
  "type": "Box",
  "estimatedDeliveryDate": "2025-08-05"
}
```

#### 🔹 My Parcels (Sender/Receiver)

`GET /parcel/my-parcels`
Returns parcels created or received by the logged-in user.

---

### 📤 Delivery Update Routes

#### 🔹 Update Parcel Delivery Status

`POST /parcel/delivery/update`
**(Role: DELIVERY_BOY / ADMIN / SUPER_ADMIN)**

```json
{
  "parcelId": "662b3ef15d31281e7aa29f12",
  "status": "Delivered",
  "location": "Dhaka"
}
```

---

### 🔍 Admin Routes

#### 🔹 Get All Parcels

`GET /parcel/all`
**(Role: ADMIN / SUPER_ADMIN)**
Returns all parcels in the system.

---

#### 🔹 Filter Parcels (By Status & Date)

`POST /parcel/filter-parcel`
**(Role: ADMIN / SUPER_ADMIN)**

```json
{
  "status": "Delivered",
  "from": "2024-01-01",
  "to": "2024-06-30"
}
```

You can pass only `status`, only `from`/`to`, or both.

---

## 🛡️ Protected Routes

All protected routes must include the token:

```http
Authorization: Bearer <your_access_token>
```

---

## 🧩 Middleware

- `checkAuth(roles...)` – Verifies token and role-based access.

---

## 📛 Error Handling Format

```json
{
  "success": false,
  "message": "Error message here",
  "error": {}
}
```

---

## 📘 Route Tasks (Detailed)

| Route                          | Role(s)              | Description                                      |
| ------------------------------ | -------------------- | ------------------------------------------------ |
| `POST /auth/register`          | PUBLIC               | Register user with a specific role               |
| `POST /auth/login`             | PUBLIC               | Login and receive tokens                         |
| `POST /auth/refresh-token`     | PUBLIC               | Refresh access token using refresh token         |
| `POST /parcel/create`          | SENDER               | Create a new parcel                              |
| `GET /parcel/my-parcels`       | SENDER / RECEIVER    | View parcels sent/received by current user       |
| `POST /parcel/delivery/update` | DELIVERY_BOY / ADMIN | Update parcel delivery status and location       |
| `GET /parcel/all`              | ADMIN / SUPER_ADMIN  | View all parcels                                 |
| `POST /parcel/filter-parcel`   | ADMIN / SUPER_ADMIN  | Filter parcels by delivery status and date range |

---

## 👤 Author

**Zubayer Hossain Uday**

- 🧑‍💻 GitHub: [@ZubayerUday](https://github.com/Uday2027)
- 📘 Facebook: [Zubayer Hossain Uday](https://facebook.com/Y0uNeverKn0w)

---

## 📜 License

This project is licensed under the MIT License — free to use and modify.

---

## 💭 Final Thoughts

This system was not just a bunch of code. It was:

- ☕ brewed with strong coffee,
- 💤 coded with sleepy eyes,
- 📦 inspired by real-life parcels lying on the desk,
- ⌨️ typed with fingers too tired to press backspace,
- 💡 shaped by sudden ideas at the worst possible hours.

If this project saved your deadline, sparked an idea, or made you go “Wow, that’s clean!” — give it a ⭐ on GitHub.

---

## 🙌 Special Thanks

To all the developers who:

- yell at their terminal,
- fight bugs like warriors,
- debug through tears,
- and still commit like champions…

This one’s for you.
**Keep building. Keep dreaming. 🚀**

```

```
