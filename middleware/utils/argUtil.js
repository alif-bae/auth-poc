// validate path param is present and valid
function validatePathParam(req, res, next) {
  if (!req.params.id || parseInt(req.params.id) <= 0) {
    res.status(400).json({ message: "Bad Request" });
  } else {
    next();
  }
}

module.exports = {
  validatePathParam,
};
