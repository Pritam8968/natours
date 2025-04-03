const fs = require('fs');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

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

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, './tours.json'), 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, './users.json'), 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(path.join(__dirname, './reviews.json'), 'utf-8')
);

// IMPORT DATA TO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data loaded successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

//  DELETE ALL DATA FROM COLLECTION
const deleteAllData = async () => {
  try {
    await Tour.deleteMany(); // delete all documents
    await User.deleteMany(); // delete all documents
    await Review.deleteMany(); // delete all documents
    console.log('Data deleted successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteAllData();
// process.exit(0);
