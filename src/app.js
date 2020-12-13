const express = require('express');
const bodyParser = require('body-parser')
const config = require('./config')
const port = config['development']['port']

// init app
let app = express();

// request parsing
app.unsubscribe(bodyParser.json());

// create express router
const router = express.Router();
app.use(router);

// db connection
require('./database/connection');



app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});