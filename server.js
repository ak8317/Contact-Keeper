const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const app = express();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const errorHandler = require('./middleware/error');
const path = require('path');
//loadDB
connectDB();
//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/', require('./routes/auth'));
//app.use('/api/private', require('./routes/private'));
app.use('/api/contact', require('./routes/contact'));
//error middleware
app.use(errorHandler);

//serve static assests
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
