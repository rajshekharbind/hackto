# Placement Platform Backend

Backend API server for the Placement Platform application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- `GET /api/jobs/enriched` - Get all job listings
- `GET /api/jobs/:id` - Get specific job by ID
- `GET /api/health` - Health check endpoint

## Server

Runs on `http://localhost:5000`
