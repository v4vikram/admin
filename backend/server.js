
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");
const connectDB = require('./config/db');
const setupRoutes = require('./startup/routes.startup');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 2000;

// Make 'uploads' folder publicly accessible
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Server working!');
});

setupRoutes(app);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
