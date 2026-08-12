const { loadEnvFile } = require('node:process');
const fs = require('node:fs');

// Esto lee tu archivo local .env y carga las variables
if (fs.existsSync('.env')) {
    loadEnvFile('.env'); 
}

const app = require('./src/index.js');
// Si process.env.PORT existe (gracias al .env local o a Railway), usará ese. Si no, usará 3000.
const PORT = process.env.PORT || 3000; 

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});
