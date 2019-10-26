const express = require("express");
const connectDB = require("./config/db");
const app = express();

//Connect to DB
connectDB();

// Init middleware
// app.get("/", (req, res) => res.send("API Running"));
app.use(express.json({ extended: false, limit: "50mb" }));

const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const uploads = require("./routes/api/uploads");
const reports = require("./routes/api/reports");
const test = require("./routes/api/test");

// Use Routes
app.use("/users", users);
app.use("/auth", auth);
app.use("/uploads", uploads);
app.use("/reports", reports);
app.use("/test", test);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  console.log("In production");
}

const port = process.env.API_PORT || 5000;

app.listen(port, () => console.log(`App listening ${port}`));
