class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 400;
    this.name  = this.constructor.name;
  }
}

class DataBaseError extends Error{
  constructor(message,statusCode){
    super(message);
    this.statusCode = statusCode  || 500;
    this.name = this.constructor.name
  }
}

module.exports = {
  CustomError,
  DataBaseError,
};