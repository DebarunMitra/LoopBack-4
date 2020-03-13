import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import express, {Request, Response} from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';
import mongoose from 'mongoose';
import {User} from './../models/user.model';
import {UserRepository} from '../repositories/user.repository';

const GoogleStrategy = passportGoogle.Strategy;
// const User = mongoose.model('User');

// const schema:any = new mongoose.Schema(User);
//const app = express();

// let db = app.dataSources.mongoatlas;
// let myModelName = app.models.user.model;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser<any, any>((id, done) => {
  User.findById(id, (err: any, user: unknown) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '942761383293-ps09vn925gj06nokttgpt4nduvjc38c0.apps.googleusercontent.com',
      clientSecret: 'UhCy7U8odUkkMDtRHxsimcVl',
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
      passReqToCallback: true,
    },
    (req: any, accessToken, refreshToken, profile: any, done) => {
      if (req.user) {
        User.findOne(
          {googleID: profile.id},
          (err: string, existingUser: any) => {
            if (err) {
              return done(err);
            }
            if (existingUser) {
              req.flash('errors', {
                msg:
                  'There is already a googleID account that belongs to you. Sign in with that account or delete it, then link it with your current account.',
              });
              done(err);
            } else {
              User.findById(req.user.id, (err: string, user: any) => {
                if (err) {
                  return done(err);
                }
                const newUser: any = new User();
                newUser.googleID = profile.id;
                newUser.firstName = profile.name.givenName;
                newUser.lastName = profile.name.familyName;
                newUser.email = profile.emails[0].value;
                newUser.image = profile.photos[0].value;
                user = newUser;
                user.save((err: Error) => {
                  req.flash('info', {
                    msg: 'googleID account has been linked.',
                  });
                  done(err, user);
                });
              });
            }
          },
        );
      } else {
        User.findOne(
          {googleID: profile.id},
          (err: string, existingUser: any) => {
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
            const newUser: any = new User();
            newUser.googleID = profile.id;
            newUser.firstName = profile.name.givenName;
            newUser.lastName = profile.name.familyName;
            newUser.email = profile.emails[0].value;
            newUser.image = profile.photos[0].value;
            newUser.save((err: Error) => {
              done(err, newUser);
            });
          },
        );
      }
    },
  ),
);
