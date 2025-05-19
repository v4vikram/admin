// middlewares/validate.js
const createError = require('http-errors');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    // console.log("error", error);
    if (error) {
     
      return next(createError(422, error.details[0].message));
    }
    next();
  };
};

module.exports = validate;
