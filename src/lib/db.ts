import { Pool } from 'pg';

const pool = new Pool({
  host: import.meta.env.VITE_DB_HOST,
  port: parseInt(import.meta.env.VITE_DB_PORT || '5432'),
  user: import.meta.env.VITE_DB_USER,
  password: import.meta.env.VITE_DB_PASSWORD,
  database: import.meta.env.VITE_DB_NAME,
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};