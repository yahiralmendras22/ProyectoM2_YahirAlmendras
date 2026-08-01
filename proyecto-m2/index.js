const express = require('express');
const app = express();
const port = 3000;  

app.use(express.json());

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

app.get('/', (req, res) => {
    return res.json(users);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
