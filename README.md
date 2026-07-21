# UNE Costa Rica & Modelo Süria

> **A comprehensive digital platform that connects female entrepreneurs with financial resources, training tools, and a support community.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](#)
<!-- ADD/REMOVE badges to match your actual stack -->

---

## The Problem

Female entrepreneurs in Costa Rica face challenges in finding centralized resources for business incubation, financing options, and a supportive ecosystem. Managing these applications and resources manually creates friction and limits the reach of empowerment programs. Existing systems are often fragmented, making it hard to track progress or access real-time information.

## The Solution

We built a responsive, mobile-first web application that digitizes the business incubation process for the "Modelo Süria". It provides entrepreneurs with a centralized portal to simulate budgets and find financing, while offering administrators a dashboard to manage users, publish content, and review applications efficiently.

**Note:** This is a frontend-only project (Fronin) that utilizes DBJSON (JSON Server) to imitate a real database for demonstration and prototyping purposes.

---

## Architecture
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   Client (React/Vite)      ──→  DBJSON (Mock DB)        │
│         ↑                               │               │
│      AuthContext    ←───────────────────┘               │
│                                                         │
└─────────────────────────────────────────────────────────┘

The React frontend handles all the UI, routing, and state management, differentiating between Entrepreneur (User) and Administrator (Admin) profiles. It communicates with a local JSON Server that acts as a mock backend, handling data persistence and simulating a real REST API for seamless CRUD operations without needing a complex backend infrastructure.

---

## Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | React + Vite + TypeScript | High performance, rapid development, and strict type safety to prevent runtime errors. |
| Styling | Vanilla CSS (Modules) | Encapsulated styles to ensure zero global collisions while maintaining a premium design. |
| Mock Backend | JSON Server (DBJSON) | Provides a fully functional REST API quickly using a local `db.json` file for frontend-only development. |
| Routing | React Router v6 | Manages public and protected routes to separate Admin and User environments securely. |

> **Design decisions worth noting:**  
> — **"Composer" Architecture:** Pages only compose parts and delegate all logic to atomic components, keeping the codebase modular.
> — **Frontend-Only Approach:** Using DBJSON allows for rapid iteration on the UI/UX without being blocked by backend development.
> — **Strict Type Safety:** Zero implicit `any` in TypeScript to guarantee total type safety across the application.

---

## Key Features

- **Role-Based Access Control** — Distinct portals and functionalities for Entrepreneurs (Users) and Administrators, protected by an `AuthContext`.
- **Budget Simulation** — Tools for entrepreneurs to create and manage simulated budgets for their projects.
- **Dynamic Content Management** — Admin dashboard to perform full CRUD operations on "Tips" and "News" that instantly update on the public portal.
- **Resource Catalog** — A comprehensive directory of financing options and incubation requirements for the Modelo Süria.

---

## Getting Started

### Prerequisites

```bash
node >= 16
```

### Installation

```bash
# Clone the repository
git clone https://github.com/tayroarce-lab/UNE-for-Entrepreneurs.git
cd UNE-for-Entrepreneurs

# Install dependencies
npm install

# Start the mock database (JSON Server)
# In the first terminal:
npx json-server --watch db.json --port 3001

# Start the React frontend
# In a second terminal:
npm run dev
```

### Test Accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@une.com` | `Admin123!` |
| User | `ashley@correo.com` | `Admin123!` |

### Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_API_URL` | API base URL (e.g., `http://localhost:3001`) | ❌ |

---

## API Reference

> Full docs not applicable. The project uses `json-server` which automatically generates routes based on `db.json`.

GET    /users                   List all users

POST   /users                   Create new user

GET    /news                    List news

POST   /news                    Create news

PATCH  /[resource]/:id          Update [resource]

DELETE /[resource]/:id          Delete [resource]

---

## Project Structure
src/
├── assets/              # Images and graphics
├── components/          # Reusable UI elements (Admin, User, Shared)
├── context/             # AuthContext (Authentication State)
├── pages/               # Master container pages (Composers)
├── routes/              # Public and private route configurations
├── services/            # Axios/Fetch asynchronous functions
├── styles/              # Global CSS base and variables
├── types/               # Strict TypeScript interfaces
└── main.tsx             # React entry point

---

## What I'd Improve Next

- [ ] Connect the application to a real backend (e.g., Node.js + Express) and a production database (e.g., PostgreSQL).
- [ ] Implement actual JWT-based authentication instead of the mocked frontend authentication.
- [ ] Add unit and integration tests using Vitest or Jest.

---

## Authors
- **Steven Coto**
- **Ashley Morera**
- **Tayro Arce**  
