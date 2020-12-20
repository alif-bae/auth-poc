const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const userService = require("./services/userService");

// given a user's email and password, verify their password hash
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async function (email, password, done) {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

// given a user's JWT token, get the user
passport.use(
  new JWTStrategy(
    { jwtFromRequest: ExtractJwt.fromHeader('authorization'), secretOrKey: "supersecret" },
    async function (payload, done) {
      const user = await userService.getUserByEmail(payload.sub);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);
