require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Uncaught exceptions catch
process.on('uncaughtException', err => {
  console.error(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  process.exit(1);
});

async function main() {
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

  await mongoose.connect(DB);
  console.log('Database connection successful!');
}

main();

// Server Listening
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`App is running on port: ${process.env.PORT || 3000}`)
);

// Unhandled rejections catch
process.on('unhandledRejection', err => {
  console.error(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down gracefully...');
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown for SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated!');
  });
});
