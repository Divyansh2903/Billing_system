const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const errorHandler = require('./middlewares/errorHandler');

const razorpayRoutes = require('./routes/razorpayRoutes');
const uploadRoutes=require("./routes/uploadRoutes");
const meterRoutes=require("./routes/meterRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes")
const solanaRoutes=require("./routes/solanaRoutes");


const app = express();
app.use(cors({
  origin: ["http://localhost:5173",process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(
  '/api/razorpay',
  (req, res, next) => {
    if (req.originalUrl === '/api/razorpay') {
      express.raw({ type: 'application/json' })(req, res, next);
    } else {
      express.json()(req, res, next);
    }
  },
  razorpayRoutes
);

app.use(express.json()); 
app.use('/api/upload', uploadRoutes);
app.use('/api/meter', meterRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/solana',solanaRoutes);


app.use(errorHandler);

module.exports = app;
