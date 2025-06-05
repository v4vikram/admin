const authRoutes = require('../routes/authRoutes');
// const productRoutes = require('../routes/productRoutes');
const userRoutes = require('../routes/userRoutes');
// const salesRoutes = require('../routes/salesRoutes');
// const customerRoutes = require('../routes/customerRoutes');
const blogRoutes = require('../routes/blogRoutes');

module.exports = (app) => {
  app.use('/api/user', authRoutes);
  app.use('/api/user', userRoutes);
  // app.use('/api/product', productRoutes);
  // app.use('/api/sales', salesRoutes);
  // app.use('/api/customer', customerRoutes);
  app.use('/api/blog', blogRoutes);
};
