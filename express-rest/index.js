const express = require('express');
const app = express();
const port = 3030;

app.get('/', (req, res) => res.send({'message':'Hello World!'}));

app.get('/random', (req, res) => res.send({'number':randomInt(100)}));

randomInt = max => Math.floor(Math.random() * Math.floor(max));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
