const passport = require("passport");

function authenticate(req, res, next) {
    passport.authenticate("jwt", { session: false })
    next()
}

module.exports = {
    authenticate
}
