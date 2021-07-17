const express = require('express');
const enrouten = require('express-enrouten');
const mongoose = require('mongoose');
const response = require('./libs/response');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(enrouten({
  directory: 'controllers',
  routes: [
    { path: '/', method: 'GET', handler: (_, res) => response(res, 'Service Linggis') }
  ]
}));
app.use('*', (_, res) => {
  const e = new Error('API is not exist');
  e.status = 501;
  return response(res, e);
});

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) throw new Error('MongoDB string in .env file not found!');
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}).catch((e) => {
  console.error(e);
});

const PORT = process.env.PORT || 3000;
