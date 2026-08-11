const { Pool } = require('pg');

const configPool = process.env.DATABASE_URL 
    ? { 
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
      }
    : {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        max: parseInt(process.env.DB_MAX_CONNECTIONS, 10) || 10
      };

const pool = new Pool(configPool); 

// Agrego esto para evitar que tu servidor se caiga ante un microcorte en la nube
pool.on("error", (err) => {
  console.error("Error inesperado en el pool de PostgreSQL:", err);
});

module.exports = { pool };


