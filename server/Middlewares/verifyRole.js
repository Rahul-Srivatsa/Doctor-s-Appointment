const displayError = require("./dispalyError");

const verifyRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return displayError(res, 403, "Access Denied");
    }
    next();
  };

module.exports = verifyRole;
