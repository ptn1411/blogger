const express = require('express');
const config = require("../config");
const blogger = require('../model/blogger');
const router = express.Router();


router.get('/', async function (req, res, next) {
    if (req.session.user) {
        const result = await blogger.listPost(req.session.user.email);

        res.render('blogger', {title: config.title, user: req.session.user, data: result})

    } else {
        res.redirect('/auth/login');
    }
});

router.get('/delete/:id', async function (req, res, next) {
    if (req.session.user) {
        const postId = req.params.id;
        const result = await blogger.deleteBlog(req.session.user.email, postId);
        res.send(result);
    } else {
        res.redirect('/auth/login');
    }
});

router.route('/edit/:id')
    .get(async function (req, res, next) {
        if (req.session.user) {
            if (req.params.id) {
                const result = await blogger.getPost(req.params.id);

                res.render('editblogger', {title: config.title, user: req.session.user, data: result});
            } else {
                res.redirect('/blog');
            }
        } else {
            res.redirect('/auth/login');
        }
    })
    .post(async function (req, res) {
        if (req.session.user) {
            await blogger.updatePost(req.session.user.email, req.body.postId, req.body.title, req.body.myTextarea, req.body.labels);
            const result = await blogger.getPost(req.params.id);
            res.render('editblogger', {
                title: config.title,
                user: req.session.user,
                errorMessages: 'Updated post',
                data: result
            });
        } else {
            res.redirect('/auth/login');
        }
    });

router.route('/new').get(function (req, res) {
    if (req.session.user) {
        res.render('newblogger', {title: config.title, user: req.session.user});
    } else {
        res.redirect('/auth/login');
    }
}).post(async function (req, res) {
    if (req.session.user) {
        const result = await blogger.newPost(req.session.user.email, req.body.title, req.body.myTextarea, req.body.labels);

        res.redirect(`/blog/edit/${result.data.id}`);
    } else {
        res.redirect('/auth/login');
    }
});

module.exports = router;