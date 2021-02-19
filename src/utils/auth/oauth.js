const UserModel = require("../../services/users/schema");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const { authenticateUser } = require(".");

passport.use(
  "spotify",
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: `${process.env.BE_URL}/users/spotifyRedirect`,
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      console.log(profile);
      const newUser = {
        spotifyId: profile.id,
        name: profile.displayName.split(" ")[0],
        lastName: profile.displayName.split(" ")[1],
        username: profile.username,
        role: "user",
        refreshTokens: [],
        email: profile.emails[0].value,
      };

      try {
        const user = await UserModel.findOne({ spotifyId: profile.id });

        if (user) {
          const tokens = await authenticateUser(user);
          done(null, { user, tokens });
        } else {
          const createdUser = new UserModel(newUser);
          await createdUser.save();
          const tokens = await authenticateUser(createdUser);

          done(null, { user: createdUser, tokens });
        }
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: `${process.env.BE_URL}/users/facebookRedirect`,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const newUser = {
        facebookId: profile.id,
        name: profile.displayName.split(" ")[0],
        lastName: profile.displayName.split(" ")[1],
        username: profile.username,
        role: "user",
        refreshTokens: [],
        email: profile.emails[0].value,
      };

      try {
        const user = await UserModel.findOne({ spotifyId: profile.id });

        if (user) {
          const tokens = await authenticateUser(user);
          done(null, { user, tokens });
        } else {
          const createdUser = new UserModel(newUser);
          await createdUser.save();
          const tokens = await authenticateUser(createdUser);

          done(null, { user: createdUser, tokens });
        }
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, next) {
  next(null, user);
});
