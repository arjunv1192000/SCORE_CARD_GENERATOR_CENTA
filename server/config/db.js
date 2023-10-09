import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reportcard_generator',
  password: '12345',
  port: 5432,
});

export default { pool };
