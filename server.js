require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

/*  
  ───────────────────────────────────────
  GLOBAL ERROR HANDLING FOR UNCAUGHT EXCEPTIONS
  ───────────────────────────────────────
*/
process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

/*  
  ───────────────────────────────────────
  DATABASE CONNECTION
  ───────────────────────────────────────
*/
async function connectDB() {
  try {
    const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    );

    await mongoose.connect(DB);
    console.log('✅ Database connection successful!');
  } catch (err) {
    console.error('❌ Database connection failed!');
    console.error(err);
    process.exit(1);
  }
}

connectDB();

/*  
  ───────────────────────────────────────
  SERVER SETUP
  ───────────────────────────────────────
*/
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});

/*  
  ───────────────────────────────────────
  GLOBAL ERROR HANDLING FOR UNHANDLED PROMISE REJECTIONS
  ───────────────────────────────────────
*/
process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down gracefully...');
  console.error(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

/*  
  ───────────────────────────────────────
  GRACEFUL SHUTDOWN FOR SIGTERM (HEROKU, CLOUD RUN, DOCKER, ETC.)
  ───────────────────────────────────────
*/
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated!');
  });
});
