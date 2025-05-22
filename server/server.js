require("reflect-metadata");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AppDataSource } = require('./config/database');
const softwareRouter = require("./routes/software.routes");
const userRouter = require("./routes/user.route");
const verifyToken = require("./middlewares/authMiddleware");
const requestRouter = require("./routes/request.routes");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST'],
  credentials: true, // Allow cookies
}));
app.use(bodyParser.json());
app.use(cookieParser()); // Parse cookies


AppDataSource.initialize()
  .then(() => {
    console.log("📦 Data Source has been initialized!");
  })

app.use('/api/user', userRouter);
app.use(verifyToken);
app.use('/api/software', softwareRouter);
app.use('/api/request', requestRouter);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port: ${PORT}`);
});
