const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({
  path: './config.env'
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB Connection successful');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

process.on('unhandledRejection', error => {
  console.log(error.name, error.message);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', error => {
  console.log(error.name, error.message);
  server.close(() => process.exit(1));
});
