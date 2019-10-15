const express = require("express");
const connectDB =require('./config/db');
const app = express();

//Connect to DB
connectDB();

// Init middleware
app.use(express.json({ extended: false, limit:'50mb' }));

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const upload = require('./routes/api/upload');

// Use Routes
app.use('/users', users);
app.use('/auth', auth);
app.use('/upload', upload);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  console.log("In production")
}

const port = process.env.API_PORT || 5000;

app.listen(port, () => console.log(`App listening ${port}`));
