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

## Useful Commands

To generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Docker

```bash
# Start MySQL
docker-compose up -d

# Stop MySQL
docker-compose down

# View logs
docker-compose logs -f mysql

# Reset database (⚠️ deletes all data)
docker-compose down -v
docker-compose up -d
```

### Backend

```bash
cd docmanager-backend

# Development
npm run dev

# Database migrations
npx prisma migrate dev

# View database in Prisma Studio
npx prisma studio

# Generate Prisma Client
npx prisma generate
```

### Frontend

```bash
cd docmanager-frontend

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### MySQL Connection Issues

```bash
# Check if MySQL is running
docker-compose ps

# Restart MySQL
docker-compose restart mysql

# Check logs
docker-compose logs mysql
```

### Port Already in Use

If port 3306 (MySQL), 3000 (backend), or 5173 (frontend) is already in use:

**MySQL**: Edit `docker-compose.yml` and change ports:

```yaml
ports:
  - "3307:3306" # Use 3307 instead
```

**Backend**: Change PORT in `.env`:

```env
PORT=3001
```

**Frontend**: Add to `vite.config.ts`:

```ts
export default defineConfig({
  server: {
    port: 5174,
  },
});
```

### Prisma Issues

```bash
# Regenerate Prisma Client
cd docmanager-backend
npx prisma generate

# Reset database
npx prisma migrate reset
```

## Development Workflow

1. Make sure Docker MySQL is running
2. Start backend: `cd docmanager-backend && npm run dev`
3. Start frontend: `cd docmanager-frontend && npm run dev`
4. Make changes and test
5. Commit changes to git
