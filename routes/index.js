var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config');

var transporter = nodemailer.createTransport(config.mailer);
/* GET home page. */


/* GET home page. */
router.get('/', function(req, res, next) {
 if(req.session.user){
  res.redirect('/users')
 }else{
   res.render('index', { title: config.title });
 }

});



router.get('/about', function(req, res, next) {
  res.render('about', { title: config.title});
});

router.route('/contact')
    .get(function(req, res, next) {
      res.render('contact', { title: config.title});
    })
    .post(function(req, res, next) {

      var errors = req.validationErrors();

      if(errors) {
        res.render('contact', {
          title: 'Code4Share - a platform for sharing code.',
          name: req.body.name,
          email: req.body.email,
          message: req.body.message,
          errorMessages: errors
        });
      } else {
        var mailOptions = {
          from: 'Code4Share <no-reply@code4share.com>',
          to: 'demo.code4startup@gmail.com',
          subject: 'You got a new message from visitor 💋 😽',
          text: req.body.message
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return console.log(error);
          }
          res.render('thank', { title: 'Code4Share - a platform for sharing code.'});
        });

      }
    });

module.exports = router;
