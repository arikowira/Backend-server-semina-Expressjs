//import http-status-code
const { StatusCodes } = require("http-status-codes");
//import custom-api
const CustomAPIError = require("./custom-api-error");

class Unauthorized extends CustomAPIError {
  constructor(message) {
    super(message);
    //memberikan statusCode not found
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
module.exports = Unauthorized;
