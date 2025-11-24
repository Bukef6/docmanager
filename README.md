# Document Manager

Full-stack document management application with file upload, tagging, and user authentication.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + Prisma
- **Database**: MySQL 8 (Docker)

## Prerequisites

Before you begin, ensure you have installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (for MySQL)
- [Node.js 18+](https://nodejs.org/) (includes npm)
- [Git](https://git-scm.com/)

## Quick Start

### 1. Clone the Repository

```bash
git clone
cd
```

### 2. Start MySQL Database from backend

```bash
cd docmanager-backend
# Start MySQL container
docker-compose up -d

# Verify it's running
docker-compose ps
```

### 3. Setup Backend

```bash
cd docmanager-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start backend server
npm run dev
```

Backend will run on `http://localhost:3000` (or your configured PORT)

### 4. Setup Frontend

Open a new terminal:

```bash
cd docmanager-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env if needed (default points to localhost:3000)

# Start frontend dev server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 5. Open Application

Open your browser and navigate to `http://localhost:5173`
