require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

async function main() {
  try {
    const DB = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    );

    await mongoose.connect(DB);
    console.log('Database connection successful!');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
}

main();

// Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`App is running on port: ${process.env.PORT || 3000}`)
);
