const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../models/UserModel');
const { filterUserData } = require('../utils/utilities');
const { verifyPassword } = require('./bcrypt');

passport.serializeUser(function (req, user, done) {
	done(null, JSON.stringify(filterUserData(user)));
});

passport.deserializeUser(async function (req, userPayload, done) {
	try {
		const userData = JSON.parse(userPayload);
		done(null, userData);
	} catch (error) {
		done(error);
	}
});

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			const userCreds = await UserModel.getUserDetails({ email }).catch(
				(err) => {
					return done(err);
				}
			);

			if (!userCreds) return done(null, false, 'User data not found');

			const passMatched = await verifyPassword(
				password,
				userCreds.password
			);
			if (passMatched) return done(null, userCreds, 'Success');
			else return done(null, false, 'Password incorrect');
		}
	)
);
