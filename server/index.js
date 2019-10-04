const express = require("express");
const bodyParser = require('body-parser');
const app = express();


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const upload = require('./routes/api/upload');
const scheduler = require('./routes/api/scheduler');

// Use Routes
app.use('/upload', upload);
app.use('/scheduler', scheduler);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  console.log("In production")
}

const port = process.env.API_PORT || 5005;

app.listen(port, () => console.log(`App listening ${port}`));
