const dotenv = require('dotenv');
const schedule = require('node-schedule')

const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔥 WE ARE SHUTTING DOWN...');
  console.log(err.name, err.message, err);

  process.exit(1);
});
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(process.env.NODE_ENV);
  });

  
//creating a new connection for the model

// creating the document

const port = process.env.port || 4200;
const server = app.listen(port, () => {
  console.log(`App running on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLEREJECTION! 🔥 WE ARE SHUTTING DOWN...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
