# TaskFlow - MERN Task Management Application

## Overview

TaskFlow is a full-stack Task Management Web Application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js).

The application allows users to register, log in securely, and manage their personal tasks. Users can create, update, delete, and track task status as completed or pending.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Cookie-based Authentication

### Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks as Completed or Pending

### User Interface

* Responsive Design
* React Functional Components
* React Hooks
* Clean Dashboard UI
* Form Validation

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Icons

### Backend

* Node.js
* Express.js
* JWT Authentication
* Cookie Parser
* bcrypt

### Database

* MongoDB Atlas
* Mongoose

---

## Project Structure

```bash
taskFlow/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## Installation and Setup

### Clone Repository

```bash
git clone https://github.com/mohdshehzan092/taskFlow.git
cd taskFlow
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=2000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

Start Backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file inside the client folder:

```env
VITE_API_URL=http://localhost:2000/api
```

Start Frontend:

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint            | Description   |
| ------ | ------------------- | ------------- |
| POST   | /api/users/register | Register User |
| POST   | /api/users/login    | Login User    |
| POST   | /api/users/logout   | Logout User   |

### Tasks

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/tasks     | Get All Tasks  |
| GET    | /api/tasks/:id | Get Task By ID |
| POST   | /api/tasks     | Create Task    |
| PUT    | /api/tasks/:id | Update Task    |
| DELETE | /api/tasks/:id | Delete Task    |

---

## Deployment

### Frontend

Deployed on Render

### Backend

Deployed on Render

### Database

MongoDB Atlas


---

## Author

**Mohd Shehzan**

GitHub: https://github.com/mohdshehzan092
