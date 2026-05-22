# TaskFlow – Project & Task Management Platform

A full-stack productivity application for managing projects and tasks with real-time updates, role-based access, and a clean Kanban-style interface.

## Features
- User authentication with JWT (register/login/logout)
- Create, update, and delete projects
- Task management with priority levels (low / medium / high)
- Kanban-style status columns: **Todo → In Progress → Review → Done**
- Real-time notifications via Socket.io
- Drag-and-drop task board
- Deadline tracking & progress analytics
- Role-based access (admin / member)
- Secure input validation & OWASP best practices

## Tech Stack
| Layer    | Technology                           |
|----------|--------------------------------------|
| Frontend | React.js, React Router, Axios        |
| Backend  | Node.js, Express.js                  |
| Database | MongoDB (Mongoose)                   |
| Auth     | JWT, bcryptjs                        |
| Realtime | Socket.io                            |

## Getting Started

### Prerequisites
- Node.js >= 16
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env        # fill in MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The app runs on **http://localhost:3000** and the API on **http://localhost:5000**.

## API Endpoints

### Auth
| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| POST   | /api/auth/register    | Register new user  |
| POST   | /api/auth/login       | Login              |
| GET    | /api/auth/profile     | Get current user   |

### Projects
| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| GET    | /api/projects         | Get all projects   |
| POST   | /api/projects         | Create project     |
| GET    | /api/projects/:id     | Get project by ID  |
| PUT    | /api/projects/:id     | Update project     |
| DELETE | /api/projects/:id     | Delete project     |

### Tasks
| Method | Endpoint                          | Description           |
|--------|-----------------------------------|-----------------------|
| GET    | /api/tasks/project/:projectId     | Get tasks by project  |
| POST   | /api/tasks                        | Create task           |
| PUT    | /api/tasks/:id                    | Update task           |
| DELETE | /api/tasks/:id                    | Delete task           |

## Project Structure
```
taskflow/
├── backend/
│   ├── models/          # Mongoose schemas (User, Project, Task)
│   ├── routes/          # Express route handlers
│   ├── middleware/       # JWT auth middleware
│   └── server.js        # Entry point + Socket.io setup
└── frontend/
    └── src/
        ├── context/     # AuthContext (global state)
        ├── pages/       # Login, Register, Dashboard, ProjectDetail
        └── components/  # Navbar, TaskCard, etc.
```

## Author
**Muhammad Hammad Khan** – [github.com/madiikhan0973-create](https://github.com/madiikhan0973-create)
