const express = require('express');
const firestore = require('../database/firestore');
const config = require('../config');
const moment = require('moment');
const router = express.Router();

/* GET users listing. */
router.route('/users')
    .get(async function (req, res, next) {
        if (req.session.user) {
            const result = await firestore.getUser(req.session.user.email);
            const idUer = result[0].id;
            const email = result[0].data.email;
            const date = result[0].data.date;
            const idblogger=result[0].data.idBlogger || 'Id Blogger';

            const image = result[0].data.picture || '/images/avatar.jpg';
            const formatTimeAgo = moment(parseInt(date, 10)).fromNow();
            const options = {
                title: config.title,
                user: req.session.user,
                email: email,
                image: image,
                date: formatTimeAgo,
                id: idUer,
                idblogger: idblogger

            }
            res.render('user', options);


        } else {
            res.redirect('/auth/login');
        }
    })
    .post(async function (req, res) {
        if (req.session.user) {
            const iduer = req.body.iduers;
            const idblogger = req.body.idblogger;
            await firestore.addApiBlogger(iduer,idblogger);
            res.redirect('users');
        } else {
            res.redirect('/auth/login');
        }
    });
router.get("/:uid", (req, res) => {
    const uid = req.params.uid;
    res.send('uid: ' + uid);
});

module.exports = router;
