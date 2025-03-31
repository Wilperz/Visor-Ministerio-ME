# Backend Setup Instructions

1. Install PostgreSQL and PostGIS
```bash
# For Ubuntu/Debian
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib postgis

# For macOS with Homebrew
brew install postgresql postgis
```

2. Create the database and enable PostGIS
```sql
CREATE DATABASE municipios;
\c municipios
CREATE EXTENSION postgis;
```

3. Install Python dependencies
```bash
pip install -r requirements.txt
```

4. Run the backend server
```bash
uvicorn main:app --reload
```

The server will start at http://localhost:8000