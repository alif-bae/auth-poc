const express = require('express');
const bodyParser = require('body-parser')

// init app
let app = express();

// request parsing
app.use(bodyParser.json());

// setup routes
const userRouter = require('./routes/users')
const groupRouter = require('./routes/groups')
const collectionRouter = require('./routes/collections')
const itemRouter = require('./routes/items');

app.use('/user', userRouter)
app.use('/group', groupRouter)
app.use('/collection', collectionRouter)
app.use('/item', itemRouter)

// db connection
const sequelize = require('./database/connection');

const User = sequelize.import('./models/user')
User.create({
  email: "hello",
  password: "world"
})

const port = 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});