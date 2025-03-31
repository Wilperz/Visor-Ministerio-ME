# Municipios Viewer - Docker Deployment

## Prerequisites

- Docker
- Docker Compose

## Installation and Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-directory>
```

2. Create a `.env` file in the root directory with your database configuration:
```bash
VITE_DB_HOST=db
VITE_DB_PORT=5432
VITE_DB_USER=postgres
VITE_DB_PASSWORD=postgres
VITE_DB_NAME=municipios
```

3. Build and start the containers:
```bash
docker-compose up -d --build
```

4. The application will be available at `http://localhost:80`

## Database Migrations

The database migrations will be automatically applied when the container starts up, as they are mounted in the `/docker-entrypoint-initdb.d` directory.

## Development

To run the application in development mode:

```bash
npm install
npm run dev
```

## Production Deployment

1. Build the Docker images:
```bash
docker-compose build
```

2. Start the services:
```bash
docker-compose up -d
```

3. To stop the services:
```bash
docker-compose down
```

## Environment Variables

- `VITE_DB_HOST`: PostgreSQL host
- `VITE_DB_PORT`: PostgreSQL port
- `VITE_DB_USER`: PostgreSQL username
- `VITE_DB_PASSWORD`: PostgreSQL password
- `VITE_DB_NAME`: PostgreSQL database name

## Volumes

- `postgres_data`: Persists PostgreSQL data
- `./supabase/migrations`: Contains database migration files

## Networks

- `app-network`: Internal network for communication between services