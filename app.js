const express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan')

// init app
let app = express();

// middleware
app.use(bodyParser.json());
app.use(logger(':method :url :status :res[content-length] - :response-time ms'))

// setup routes
const userRouter = require('./routes/users')
const groupRouter = require('./routes/groups')
const collectionRouter = require('./routes/collections')
const itemRouter = require('./routes/items');

app.use('/user', userRouter)
app.use('/group', groupRouter)
app.use('/collection', collectionRouter)
app.use('/item', itemRouter)


const port = 3000
app.listen(port, (err) => {
  if (err) {
    console.log(err.stack);
    return
  }
  console.log
  console.log(`Listening on port ${port}...`);
});