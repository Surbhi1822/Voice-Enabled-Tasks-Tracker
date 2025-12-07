# 🎙️ Voice-Enabled Task Tracker

A full-stack task management application with support for **voice-based task creation**, **natural-language parsing**, and an intuitive **Kanban/List interface**.  
Built using **React, TypeScript, Node.js, Express, MongoDB**, and a custom NLP pipeline.

---

## 📑 Table of Contents
1. Overview  
2. Features  
3. Architecture  
4. Technology Stack  
5. Folder Structure  
6. Backend Overview  
7. Frontend Overview  
8. Natural Language Processing  
9. API Endpoints  
10. Installation  
11. Running the Project  
12. Environment Variables  
13. Technical Decisions & Assumptions  
14. AI Tools Usage  
15. Future Enhancements  

---

# 1. Overview
This application enables users to create and manage tasks through both a graphical interface and **voice commands**.  
The backend transforms natural-language transcripts into structured task data including **title**, **priority**, **status**, and **due date**.

---

# 2. Features

## 📝 Task Management
- Create, edit, update, and delete tasks  
- Assign priority (`urgent`, `high`, `medium`, `low`)  
- Manage status (`to do`, `in progress`, `done`)  
- Assign due dates with ISO conversion  
- View tasks using Kanban or List layouts  

## 🎤 Voice Input
- Capture speech using the **Web Speech API**  
- Backend converts transcripts → structured task  
- Modal-based preview for task confirmation  

## 🧠 Natural-Language Parsing
Extracts:
- Title  
- Priority from keywords  
- Status from action phrases  
- Due dates (absolute & relative)  

Recognizes:
- “Tomorrow afternoon”  
- “Next Monday”  
- “In 3 days”  
- “This weekend”  
- “Due by Friday”  

## 🎨 User Interface
- Kanban and List views  
- Search and filtering  
- Modern TailwindCSS glass-morphism UI  
- Dark theme support  
- Responsive and keyboard-friendly  

---

# 3. Architecture

Frontend → Backend → Database  
```
React + TypeScript + Vite
        |
        v
Node.js + Express + TypeScript
        |
        v
MongoDB Atlas
```

---

# 4. Technology Stack

## 🖥️ Frontend
- React (TypeScript)  
- Vite  
- Tailwind CSS  
- Axios  
- Framer Motion  
- Lucide Icons  
- Sonner (toast system)

## ⚙️ Backend
- Node.js / Express  
- TypeScript  
- MongoDB + Mongoose  
- chrono-node  
- Custom NLP extraction pipeline  

---

# 5. Folder Structure

```
voice-task-tracker/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── lib/
│   │   └── index.css
│
└── README.md
```

---

# 6. Backend Overview
- Provides REST endpoints for task CRUD  
- Parses natural-language transcripts into structured data  
- Connects to MongoDB for persistence  
- Contains services for date parsing, priority extraction, and intent detection  

---

# 7. Frontend Overview
- Built using **React + TypeScript**  
- Two primary views: Kanban and List  
- Includes modals for task creation, editing, and voice parsing preview  
- Uses centralized Axios wrapper for API communication  

---

# 8. Natural Language Processing

### Priority Detection
Keywords:
- urgent  
- high  
- medium  
- low  
- critical  

### Status Detection
Understands:
- “start working on” → *in progress*  
- “mark it done”, “finished” → *done*  

### Date Detection
Supports:
- Absolute dates  
- Relative dates  
- Weekdays  
- Weekend phrases  
- “In X days” logic  

Converted to **ISO format (IST)**.

---

# 9. API Endpoints

## 🗂️ Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Fetch all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## 🎤 Voice Parsing
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/voice/parse` | Convert transcript → structured task |

---

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

---

# 11. Running the Project

## Backend
```bash
npm run dev
```

## Frontend
```bash
npm run dev
```

---

# 12. Environment Variables

## Backend `.env`
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

---

# 13. Technical Decisions & Assumptions

### Architectural Decisions
- React + TypeScript chosen for scalability  
- Express for simplicity and middleware flexibility  
- MongoDB for schema flexibility  
- Local state (no Redux) to reduce complexity  
- Custom NLP pipeline for high control over parsing  

### Functional Assumptions
- Title inferred when missing  
- Priority defaults to *medium*  
- Status defaults to *to do*  
- All dates stored as ISO  
- Requires Chrome for Web Speech API  

### UI/UX Assumptions
- Modal-based voice recording UX  
- Kanban/List switching allowed anytime  
- Browser-default select styling  

---

# 14. AI Tools Usage

### Tools Used
- ChatGPT (GPT‑5.1)  
- Optional: GitHub Copilot, Cursor  

### Assistance Provided
- TypeScript debugging  
- NLP workflow design  
- Regex + date parsing improvements  
- Tailwind CSS troubleshooting  
- Documentation + architecture guidance  

### Learning Outcomes
- Stronger TS narrowing  
- Better backend modularity  
- Improved understanding of browser APIs  
- Experience building NLP-powered features  
- First-hand experience using TailwindCSS for utility-first UI development

---

# 15. Future Enhancements
- Offline speech recognition  
- User authentication  
- Reminders and notifications  
- Subtasks and task grouping  
- Export to CSV/PDF  
- Better mobile UI & accessibility  