const fs = require('node:fs');
const path = require('node:path');
const { pool } = require('./dbConnect');

async function initializeDatabase() {
    try {
        // 1. Ruta absoluta hacia tu archivo setup.sql
        const sqlPath = path.join(__dirname, '..', 'sql', 'setup.sql');
        
        // 2. Leer el contenido del archivo SQL como texto
        const sqlQueries = fs.readFileSync(sqlPath, 'utf-8');
        
        console.log('Iniciando la creación de tablas...');
        
        // 3. Ejecutar las consultas en la base de datos
        await pool.query(sqlQueries);
        
        console.log('¡Tablas creadas con éxito en blog_db!');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error.message);
    } finally {
        // 4. Cerrar las conexiones del pool para terminar el proceso limpiamente
        await pool.end();
    }
}

initializeDatabase(); 