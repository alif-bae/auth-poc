function validateUrlPathParam(req, res, next) {
    if (!req.param.id) {
        res.send("404 Not Found!")
    }
    next()
}