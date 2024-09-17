import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import userModel from "../models/userModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://www.netzoonback.siidevelopment.com/user/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const sanitizedUserName = profile.displayName.replace(/\s+/g, "");
        const existingUser = await userModel.findOne({
          email: profile.emails[0].value,
        });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await userModel.create({
          username: profile.displayName,
          fullName: profile.displayName,
          email: profile.emails[0].value,
          profilePhoto: profile.photos[0].value,
          password: "",
          userType: "user",
          bio: "",
          description: "",
          website: "",
          slogn: "",
          link: "",
        });
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL:
        "https://www.netzoonback.siidevelopment.com/user/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture.type(large)"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await userModel.findOne({
          email: profile.emails ? profile.emails[0].value : null,
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Create new user if not found
        const newUser = await userModel.create({
          username: `${profile.name.givenName} ${profile.name.familyName}`,
          fullName: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails
            ? profile.emails[0].value
            : "testfff@testfff.com",
          profilePhoto: profile.photos ? profile.photos[0].value : "",
          password: "",
          userType: "user",
          bio: "",
          description: "",
          website: "",
          slogn: "",
          link: "",
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel
    .findById(id)
    .then(user => {
      done(null, user); // Pass the user object to done
    })
    .catch(err => {
      done(err, null); // Pass the error to done
    });
});

export default passport;
