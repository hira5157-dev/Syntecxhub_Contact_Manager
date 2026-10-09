# Syntecxhub Contact Manager

A full-stack contact management app built with the MERN stack for the Syntecxhub Web Development internship (Project 2).

## Features
- Create, read, update and delete contacts (CRUD)
- Search contacts by name, phone or email
- Validation on both frontend and backend
- Centralized error handling with clear messages
- Responsive UI

## Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)

## Project Structure
```
Syntecxhub_Contact_Manager/
├── backend/
│   ├── middleware/errorHandler.js
│   ├── models/Contact.js
│   ├── routes/contacts.js
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/ (ContactForm, ContactList)
    │   ├── api.js
    │   ├── App.jsx
    │   └── styles.css
    └── vite.config.js
```

## Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env     # on Windows: copy .env.example .env
npm start
```
The API runs on `http://localhost:5000`.

### 2. Frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
The app opens on `http://localhost:5173` (API calls are proxied to the backend).

## API Endpoints

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| GET    | `/api/contacts`      | List contacts (`?search=text`)       |
| GET    | `/api/contacts/:id`  | Get one contact                      |
| POST   | `/api/contacts`      | Create a contact                     |
| PUT    | `/api/contacts/:id`  | Update a contact                     |
| DELETE | `/api/contacts/:id`  | Delete a contact                     |

Contact body: `{ "name": "Ali Khan", "phone": "0300 1234567", "email": "ali@example.com", "address": "Lahore" }`

## Validation Rules
- **name:** required, 2-60 characters
- **phone:** required, 7-15 digits (may include `+`, spaces, `-`)
- **email:** required, valid format
- **address:** optional, max 120 characters

## Author
Built as part of the Syntecxhub Internship Program.
