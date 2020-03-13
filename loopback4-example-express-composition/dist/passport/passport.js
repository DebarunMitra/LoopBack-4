"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport_1 = tslib_1.__importDefault(require("passport"));
const passport_google_oauth20_1 = tslib_1.__importDefault(require("passport-google-oauth20"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const User = mongoose_1.default.model('user');
passport_1.default.serializeUser((user, done) => {
    done(undefined, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
passport_1.default.use(new GoogleStrategy({
    clientID: '942761383293-ps09vn925gj06nokttgpt4nduvjc38c0.apps.googleusercontent.com',
    clientSecret: 'UhCy7U8odUkkMDtRHxsimcVl',
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email'],
    passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
    if (req.user) {
        User.findOne({
            arg0: { googleID: profile.id },
            arg1: (err, existingUser) => {
                if (err) {
                    return done(err);
                }
                if (existingUser) {
                    req.flash('errors', {
                        msg: 'There is already a googleID account that belongs to you. Sign in with that account or delete it, then link it with your current account.',
                    });
                    done(err);
                }
                else {
                    User.findById(req.user.id, (err, user) => {
                        if (err) {
                            return done(err);
                        }
                        const newUser = new User();
                        newUser.googleID = profile.id;
                        newUser.firstName = profile.name.givenName;
                        newUser.lastName = profile.name.familyName;
                        newUser.email = profile.emails[0].value;
                        newUser.image = profile.photos[0].value;
                        user = newUser;
                        user.save((err) => {
                            req.flash('info', {
                                msg: 'googleID account has been linked.',
                            });
                            done(err, user);
                        });
                    });
                }
            },
        });
    }
    else {
        User.findOne({
            arg0: { googleID: profile.id },
            arg1: (err, existingUser) => {
                if (err) {
                    return done(err);
                }
                if (existingUser) {
                    return done(undefined, existingUser);
                }
                // User.findOne(
                //   {email: profile.emails[0].value},
                //   (err: string, existingEmailUser: any) => {
                //     if (err) {
                //       return done(err);
                //     }
                //     if (existingEmailUser) {
                //       req.flash('errors', {
                //         msg:
                //           'There is already an account using this email address. Sign in to that account and link it with googleID manually from Account Settings.',
                //       });
                //       done(err);
                //     } else {
                //       const newUser: any = new User();
                //       newUser.googleID = profile.id;
                //       newUser.firstName = profile.name.givenName;
                //       newUser.lastName = profile.name.familyName;
                //       newUser.email = profile.emails[0].value;
                //       newUser.image = profile.photos[0].value;
                //       newUser.save((err: Error) => {
                //         done(err, newUser);
                //       });
                //     }
                //   },
                // );
                const newUser = new User();
                newUser.googleID = profile.id;
                newUser.firstName = profile.name.givenName;
                newUser.lastName = profile.name.familyName;
                newUser.email = profile.emails[0].value;
                newUser.image = profile.photos[0].value;
                newUser.save((err) => {
                    done(err, newUser);
                });
            },
        });
    }
}));
//# sourceMappingURL=passport.js.map