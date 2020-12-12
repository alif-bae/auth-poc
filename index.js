const express = require('express');
const config = require('./config/config.json')

const env = config['development']
const port = env['port']

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(port, () => console.log(`Listening on port ${port}...`))