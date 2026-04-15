# 🚀 AI Dev Copilot (Backend)

An AI-powered backend system that allows users to connect GitHub repositories and query code using a retrieval-based architecture (RAG).

---

## 🧠 Overview

This project enables developers to:

- Connect any GitHub repository
- Process and store code files
- Query the codebase using natural language
- Receive AI-generated responses based on repository context

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- simple-git
- REST APIs

---

## 🧠 System Design

### 🔷 High-Level Architecture


User → Backend API (Node.js / Express)
→ PostgreSQL (Data Storage)
→ AI Layer (Mock / Future LLM)


---

### 🔁 Request Flow

1. User connects a GitHub repository  
2. Backend clones the repository using `simple-git`  
3. Files are processed and filtered (only code files)  
4. Code is stored in PostgreSQL as chunks  
5. User sends a query  
6. Backend retrieves relevant code chunks  
7. Context + query is sent to AI layer  
8. AI returns a response  

---

### 🧱 Backend Architecture


src/
├── controllers/ → Handle HTTP requests
├── routes/ → API routes
├── services/ → Business logic (AI, repo processing)
├── middleware/ → Auth (JWT)
├── config/ → Database connection


---

### 🗄️ Database Design

#### Users
- id
- email
- password

#### Repositories
- id
- user_id
- github_url
- status

#### Code Chunks
- id
- repo_id
- file_path
- chunk_text

---

### 🤖 AI Architecture (RAG-Based)


User Query
↓
Retrieve relevant code chunks (PostgreSQL)
↓
Combine as context
↓
Send to AI model
↓
Return answer


> Currently, a mock AI layer is used. The system is designed to integrate with real LLMs like OpenAI or Gemini.

---

## 🔐 Authentication

- JWT-based authentication
- Secure API access via middleware
- Token required for protected routes

---

## 📦 API Endpoints

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Repository
- `POST /repos/connect`

### Chat
- `POST /chat/query`

---

## ⚙️ Environment Setup

Create a `.env` file in the root:


PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret


> `.env` is not included for security reasons. See `.env.example`.

---

## 🛠️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-dev-copilot.git
cd ai-dev-copilot
2. Install dependencies
npm install
3. Setup PostgreSQL
Create a database
Update DATABASE_URL in .env
4. Run the server
npm run dev

Server will run on:

http://localhost:5000
🧪 How to Test (Postman)
1. Register
POST /auth/register

Body:

{
  "email": "test@test.com",
  "password": "123456"
}
2. Login
POST /auth/login

→ Copy JWT token

3. Connect Repository
POST /repos/connect

Headers:

Authorization: Bearer <TOKEN>

Body:

{
  "github_url": "https://github.com/vercel/serve"
}
4. Query Repo
POST /chat/query

Headers:

Authorization: Bearer <TOKEN>

Body:

{
  "repoId": "your_repo_id",
  "question": "Explain this project"
}
⚙️ Key Design Decisions
PostgreSQL for structured relational data
Code chunking to handle large repositories
Limited file processing for performance
JWT for secure authentication
Modular architecture (controllers, services, routes)
LLM-agnostic AI layer
⚠️ Known Limitations
Uses mock AI responses (no real LLM yet)
No async job processing (repo processing is synchronous)
No caching layer
Limited file chunking strategy
🚀 Future Improvements
Vector database (Pinecone / FAISS)
Semantic search with embeddings
Async processing (queues)
Redis caching
Real-time streaming responses
Frontend dashboard (in progress)
🧠 Author

Krishna Bohra
Backend Developer | AI Enthusiast

⭐ If you like this project

Give it a star ⭐ on GitHub
