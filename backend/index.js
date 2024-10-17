const express = require('express');
const connectDB = require('./db');
const scholarRoutes = require('./routes/scholar');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
  origin: ["https://scholar-management-system-mern.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

connectDB();

app.use(express.json());

app.use('/api/scholars', scholarRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
