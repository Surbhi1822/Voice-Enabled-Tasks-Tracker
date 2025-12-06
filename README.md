# 🎙️ Voice-Enabled Task Tracker

A modern full-stack task management application that supports **voice-based task creation**, **natural-language processing**, and a clean **Kanban/List UI**.  
Built using **React, Node.js, TypeScript, MongoDB**, and a custom NLP pipeline.

## 📑 Table of Contents
- [1. Overview](#1-overview)
- [2. Features](#2-features)
- [3. Architecture](#3-architecture)
- [4. Technology Stack](#4-technology-stack)
- [5. Folder Structure](#5-folder-structure)
- [6. Backend Overview](#6-backend-overview)
- [7. Frontend Overview](#7-frontend-overview)
- [8. Natural Language Processing](#8-natural-language-processing)
- [9. API Endpoints](#9-api-endpoints)
- [10. Installation](#10-installation)
- [11. Running the Project](#11-running-the-project)
- [12. Environment Variables](#12-environment-variables)
- [13. Future Enhancements](#13-future-enhancements)

# 1. Overview
This project implements a **voice-enabled task tracker** that allows users to manage tasks using both a graphical interface and **voice commands**.  
The backend parses natural language to extract title, priority, status, and due date.

# 2. Features

## 📝 Task Management
- Create, edit, delete tasks
- Assign priority (`urgent`, `high`, `medium`, `low`)
- Set task status (`to do`, `in progress`, `done`)
- Due date assignment
- Automatic timestamps

## 🎤 Voice Input
- Record speech using Web Speech API
- Backend converts transcript → structured task data
- User reviews parsed content before saving

## 🧠 Natural-Language Parsing
Backend extracts:
- Title  
- Priority keywords  
- Status  
- Due dates (absolute + relative)

## 🎨 UI / UX
- Kanban & List views
- Search + filtering
- Glass-morphism Tailwind interface
- Dark mode + accessibility

# 3. Architecture
```
Frontend (React + TypeScript + Vite)
        |
        v
Backend (Node.js + Express + TypeScript)
        |
        v
Database (MongoDB Atlas)
```

# 4. Technology Stack

## Frontend
- React (TypeScript)
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Axios
- Sonner

## Backend
- Node.js / Express
- TypeScript
- MongoDB + Mongoose
- chrono-node
- NLP parsing logic

# 5. Folder Structure
```
voice-task-tracker/
│
├── backend/
│   ├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── types/
│   └── index.css
│
└── README.md
```

# 6. Backend Overview
- REST APIs for task CRUD  
- NLP parsing  
- MongoDB storage  

# 7. Frontend Overview
- Kanban + List UI  
- Voice recorder  
- Preview modal  
- Axios API wrapper  

# 8. Natural Language Processing
Supports:
- Priority detection  
- Status detection  
- Absolute + relative dates  
- Weekdays, weekend, "in X days"  

# 9. API Endpoints

## Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | List tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

## Voice Parsing
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/voice/parse | Convert transcript → structured task |

# 10. Installation

## Backend
```bash
cd backend
npm install
```

## Frontend
```bash
cd frontend
npm install
```

# 11. Running the Project

## Backend
```bash
npm run dev
```

## Frontend
```bash
npm run dev
```

# 12. Environment Variables

## Backend
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Frontend
```
VITE_API_URL=http://localhost:5000/api
```

# 13. Future Enhancements
- Offline speech recognition  
- Multi-user authentication  
- Subtasks & reminders  
- Analytics dashboard  
- Export tasks to PDF/CSV  
- Improved mobile UI  
