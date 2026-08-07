const { loadEnvFile } = require('node:process');
const fs = require('node:fs');

// Verifica si el archivo existe antes de intentar cargarlo
if (fs.existsSync('.env')) {
    loadEnvFile('.env');
}

const app = require('./src/index.js');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
