const router = require('express').Router();
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../../models/User');

passport.serializeUser((user, done) => {
    done(null, user.discordId);
});

passport.deserializeUser(async (discordId, done) => {
    try {
        const user = await User.findOne({ discordId });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.CALLBACK_URL) {
    passport.use(new DiscordStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: ['identify', 'guilds']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ discordId: profile.id });
            if (!user) {
                user = await User.create({
                    discordId: profile.id,
                    username: profile.username,
                    avatar: profile.avatar,
                    guilds: profile.guilds
                });
            } else {
                user.username = profile.username;
                user.avatar = profile.avatar;
                user.guilds = profile.guilds;
                await user.save();
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }));
}

router.get('/login', (req, res, next) => {
    if (!process.env.CLIENT_ID) {
        return res.status(500).json({ error: 'Discord Client ID not configured.' });
    }
    passport.authenticate('discord')(req, res, next);
});

router.get('/callback', passport.authenticate('discord', {
    failureRedirect: `${process.env.FRONTEND_URL}/login`
}), (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

router.get('/me', (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.json({ success: true });
    });
});

module.exports = router;
