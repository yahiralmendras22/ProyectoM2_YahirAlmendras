const { Pool } = require('pg');

const configPool = process.env.DATABASE_URL 
    ? { 
        connectionString: process.env.DATABASE_URL,
        // Habilita SSL obligatorio para servidores en la nube
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

module.exports = { pool };

