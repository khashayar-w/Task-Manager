const Joi = require("joi");
const { CustomError } = require("../Errors/Custom-errors");

//* Middleware validation for ID
const validateIdMiddleware = (req, res, next) => {
  const iD = parseInt(req.params.id);
  if (!iD || isNaN(iD)) {
    throw new CustomError("Invalid ID. Please provide a valid number", 400);
  }
  next();
};

// Middleware validation for adding post
const validateAddTaskMiddleware = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().pattern(/^[a-zA-Z0-9\s]{1,250}$/).required(),
    description: Joi.string().pattern(/^[a-zA-Z0-9\s]{1,300}$/).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  next();
};

// Middleware validation for updating task
const validateTaskMiddleware = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().pattern(/^[a-zA-Z0-9\s]{1,250}$/).required(),
    description: Joi.string().pattern(/^[a-zA-Z0-9\s]{1,300}$/).required(),
    status: Joi.string().valid("Finished", "In progress", "Not started yet"),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  next();
};


module.exports = {
  validateIdMiddleware,
  validateAddTaskMiddleware,
  validateTaskMiddleware,
};
