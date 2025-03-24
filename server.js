require('dotenv').config();
const app = require('./app');

// Server Listening
app.listen(process.env.PORT || 3000, () =>
  console.log(`App is running on port: ${process.env.PORT || 3000}`)
);
