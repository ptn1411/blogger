const express = require('express');
const {google} = require('googleapis');
const urlParse = require('url-parse');
const queryParse = require('query-string');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {createHmac} = require('crypto');
const router = express.Router();
const config = require('../config');
const firestore = require('../database/firestore');

var session;

router.route('/auth/login').get(function (req, res) {
    const oauth2Client = new google.auth.OAuth2(
        config.authGoogle.clientId,
        config.authGoogle.clientSecret,
        config.authGoogle.redirectUri
    );
    const scopes = ['https://www.googleapis.com/auth/blogger', 'https://www.googleapis.com/auth/blogger.readonly', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(' ');

    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: 'consent',
        scope: scopes,
        state: JSON.stringify({
            callbackUrl: req.body.callbackUrl,
            userID: req.body.userid
        }),
        response_type: 'code'
    });
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${url}`;

    res.render('login', {title: config.title, googleLoginUrl: googleLoginUrl})

}).post(async function (req, res) {
    const result = await firestore.loginUser(req.body.email);

    if (!result) {
        res.render('login', {errorMessages: 'Users not found'});
    } else {
        const email = result[0].data.email;
        const password = result[0].data.password;
        session = req.session;
        const hash = createHmac('sha256', config.PassSecret)
            .update(req.body.password)
            .digest('hex');
        if (req.body.email.toLowerCase() === email && hash === password) {
            const passFake = createHmac('sha256', 'con dung cai nit')
                .update('con dung cai nit')
                .digest('hex');
            const jsonwebtoken = {
                user: result[0].data.name,
                email: result[0].data.email,
                password: passFake
            }
            res.cookie('jwt', jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: jsonwebtoken
            }, config.JWTsecret));

            session.user = {
                name: result[0].data.name,
                email: result[0].data.email
            };
            res.redirect('/users');
        } else {
            res.render('login', {errorMessages: 'Users not found'});
        }
    }
});
router.route('/auth/register')
    .get(function (req, res) {
        const oauth2Client = new google.auth.OAuth2(
            config.authGoogle.clientId,
            config.authGoogle.clientSecret,
            config.authGoogle.redirectUri
        );
        const scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(' ');

        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            prompt: 'consent',
            scope: scopes,
            state: JSON.stringify({
                callbackUrl: req.body.callbackUrl,
                userID: req.body.userid
            }),
            response_type: 'code'
        });
        const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${url}`;
        res.render('registers', {title: config.title, googleLoginUrl: googleLoginUrl})
    })
    .post(async function (req, res) {
        const result = await firestore.loginUser(req.body.email);

        if (!result[0]) {
            try {
                if (req.body.password === req.body.confirmPassword) {
                    const hash = createHmac('sha256', config.PassSecret)
                        .update(req.body.password)
                        .digest('hex');
                    await firestore.registerUser(req.body.name, req.body.email.toLowerCase(), hash);
                    res.redirect('/auth/login');
                } else {
                    res.render('registers', {title: config.title, errorMessages: 'Password'});
                }

            } catch (err) {
                res.render('error', {title: config.title});
            }
        } else {
            res.render('registers', {title: config.title, errorMessages: 'account exists'});
        }

    })
router.get('/auth', async function (req, res) {
    const queryURL = new urlParse(req.url);

    if (queryURL.query.error) {
        // The user did not give us permission.
        return res.redirect('/');
    } else {
        const code = queryParse.parse(queryURL.query).code;

        const oauth2Client = new google.auth.OAuth2(
            config.authGoogle.clientId,
            config.authGoogle.clientSecret,
            config.authGoogle.redirectUri
        );
        await oauth2Client.getToken(code, async function (err, token) {
            if (err) return res.redirect('/');

            const data = await axios({
                url: 'https://www.googleapis.com/oauth2/v2/userinfo',
                method: 'get',
                headers: {
                    Authorization: `Bearer ${token.access_token}`,
                },
            });

            await firestore.loginGG(data.data.name, data.data.email, token.access_token, data.data.picture);
            const hash = createHmac('sha256', 'con dung cai nit')
                .update('con dung cai nit')
                .digest('hex');
            const jsonwebtoken = {
                user: data.data.name,
                email: data.data.email,
                picture: data.data.picture,
                password:hash
            }
            res.cookie('jwt', jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: jsonwebtoken
            }, config.JWTsecret));

            session = req.session;
            session.user = {
                name: data.data.name,
                email: data.data.email
            };
            res.redirect('/users');
        });
    }
});
router.get('/auth/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;