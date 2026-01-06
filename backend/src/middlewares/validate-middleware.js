const validate = (schema) => async (req, res, next) => {
  try {
    const parsedData = await schema.parseAsync(req.body);
    req.body = parsedData; //validated data
    next();
  } catch (err) {
    if (err.issues) {
      // err.issues is already an array of error objects
      const messages = err.issues.map((issue) => issue.message);

      // console.log(messages); // ["password no must be more than 7 char"]
      //sends first err msg to client
      //console.log(messages[0]); // "password no must be more than 7 char

      const error = {
        status: 422,
        message: "Fill proper details",
        extraDetails: messages[0],
      };
      // console.log(error);
      return next(error);
    }
    // If it's some other unexpected error
    return next({
      status: 500,
      message: "Validation failed unexpectedly",
      extraDetails: err.message,
    });
  }
};

module.exports = validate;
