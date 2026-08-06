const fs = require('node:fs');
const path = require('node:path');
const { pool } = require('./dbConnect');

async function initializeDatabase() {
    try {
        const sqlPath = path.join(__dirname, '..', 'sql', 'setup.sql');

        const sqlQueries = fs.readFileSync(sqlPath, 'utf-8');

        console.log('Iniciando la creación de tablas...');

        await pool.query(sqlQueries);

        console.log('¡Tablas creadas con éxito en blog_db!');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error.message);
    } finally {
        await pool.end();
    }
}

initializeDatabase();