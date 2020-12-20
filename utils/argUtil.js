// validate path param is present and valid
function validateUrlPathParam(req, res, next) {
    if (!req.params.id || parseInt(req.params.id) <= 0) {
        res.status(400).send("Bad Request")
    } else {
        next()
    }
}

module.exports = {
    validateUrlPathParam
}