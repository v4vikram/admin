const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Optional: for debugging
    
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,  // Optional: hide stack trace in production
    });
  };
  
  module.exports = errorHandler;
  