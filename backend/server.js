
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
// Only parse JSON and URL-encoded for non-multipart requests
app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    return next(); // skip bodyParser for file uploads
  }

  express.json({ limit: '50mb' })(req, res, (err) => {
    if (err) return next(err);
    express.urlencoded({ extended: true, limit: '50mb' })(req, res, next);
  });
});



app.get('/', (req, res) => {
  res.send('Server working!');
});

setupRoutes(app);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
