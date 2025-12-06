1. Overview

This project implements a voice-enabled task tracker allowing users to manage tasks through both a graphical interface and voice commands.
The backend parses natural-language sentences to extract attributes such as priority, due date, and status.
The frontend displays tasks using Kanban and list views.

The system was built according to the specifications in the assignment and includes full CRUD operations, filters, search, and voice input.

2. Features
Task Management

Create, edit, and delete tasks

Assign priority (urgent, high, medium, low)

Set task status (to do, in progress, done)

Due date selection

Automatic timestamps

Voice Input

Records speech via Web Speech API

Sends transcript to backend for parsing

Backend converts natural language to structured task data

User reviews parsed task before creation

Natural Language Parsing

Extracts:

Title

Priority keywords

Status

Due dates including:

Absolute dates (“15 January”, “Jan 20”)

Relative dates (“tomorrow”, “next Monday”, “in 3 days”, “by Friday”)

UI / UX

Kanban board

List view

Search and filtering

Modern glass-morphism interface using Tailwind CSS

Fully keyboard-accessible

Dark mode enabled

3. Architecture

Frontend (React + TypeScript + Vite)
        |
        | Axios REST calls
        v
Backend (Node.js + Express + TypeScript)
        |
        | Mongoose ODM
        v
Database (MongoDB Atlas)

Speech recognition occurs in the browser.
NLP parsing occurs in the backend.

4. Technology Stack
Frontend

React (TypeScript)

Vite

Tailwind CSS

Framer Motion

Lucide Icons

Axios

Sonner (notifications)

Backend

Node.js / Express

TypeScript

MongoDB + Mongoose

chrono-node for date parsing

Natural-language parsing logic

5. Folder Structure

voice-task-tracker/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   ├── task.controller.ts
│   │   │   └── voice.controller.ts
│   │   ├── models/
│   │   │   └── task.model.ts
│   │   ├── routes/
│   │   │   ├── task.routes.ts
│   │   │   └── voice.routes.ts
│   │   ├── services/
│   │   │   └── voice-parser.service.ts
│   │   ├── utils/
│   │   │   └── date.utils.ts
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.css
│   └── package.json
│
└── README.md

6. Backend Overview
Core Responsibilities

Expose REST APIs for task CRUD

Parse natural language text to structured task data

Save and retrieve tasks from MongoDB

Voice Parsing

Key components:

voice-parser.service.ts

Uses regex and chrono-node

Extracts:

Priority keywords

Date expressions

Status

Title

7. Frontend Overview
Key Features

Two views: Kanban and List

Reusable TaskModal for creation and editing

VoiceRecorder to capture speech

VoicePreviewModal to review parsed tasks

Centralized Axios client (api.ts)

State Management

Local component state + React hooks.
No external state libraries required.

8. Natural Language Processing

The backend supports:

Priority Detection

Words such as:

“urgent”

“high priority”

“low priority”

“critical”

Status Detection

Defaults to “to do” unless recognized words appear:

“start”, “work on” → in progress

“finished”, “complete” → done

Date Extraction

Supports:

Absolute dates

Relative dates

Weekday-based references

Weekend / next week syntax

Numeric phrasing:

“in 3 days”

“after 2 weeks”

Converted to ISO date strings in IST timezone.

9. API Endpoints
Tasks

| Method | Endpoint       | Description                   |
| ------ | -------------- | ----------------------------- |
| GET    | /api/tasks     | List tasks (optional filters) |
| POST   | /api/tasks     | Create a task                 |
| PUT    | /api/tasks/:id | Update a task                 |
| DELETE | /api/tasks/:id | Delete a task                 |

Voice Parsing

| Method | Endpoint         | Description                           |
| ------ | ---------------- | ------------------------------------- |
| POST   | /api/voice/parse | Convert transcript to structured task |

10. Installation
Backend
cd backend
npm install

Frontend
cd frontend
npm install

11. Running the Project
Start Backend
npm run dev

Start Frontend
npm run dev


Frontend will run on Vite (default port 5173).
Backend runs on port 5000.

12. Environment Variables

Create a .env file in /backend:

MONGODB_URI=your_mongodb_connection_string
PORT=5000


Frontend optional .env:

VITE_API_URL=http://localhost:5000/api

13. Future Enhancements

Offline speech recognition support

Multi-user authentication

Subtasks and reminders

Analytics dashboard

Export tasks to PDF / CSV

Mobile-friendly UI improvements