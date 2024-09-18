import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import AppleStrategy from "passport-apple";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";

passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      privateKeyLocation: "./AuthKey_7N97LSR4PQ.p8", // Path to your .p8 key file
      callbackURL:
        "https://www.netzoonback.siidevelopment.com/user/auth/apple/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, idToken, profile, done) => {
      try {
        // Decode idToken to access user identity information
        const decodedToken = jwt.decode(idToken);

        // Extract user information from decoded token
        const appleId = decodedToken.sub; // The Apple User ID (Unique identifier)
        const email = decodedToken.email; // Email may be null if the user didn't share it

        // Check if the user already exists in your database
        let user = await userModel.findOne({ appleId });

        if (!user && email) {
          // If user doesn't exist, create a new one
          user = await userModel.create({
            appleId,
            email,
            username: `AppleUser-${appleId}`,
            fullName: "", // Apple doesn’t return fullName after the first sign-in
            userType: "user",
            profilePhoto: "", // Apple doesn’t provide profile photos
          });
        }

        // Call done to pass the user to the next middleware
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

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
