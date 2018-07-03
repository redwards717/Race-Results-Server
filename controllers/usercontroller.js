var express = require('express');
var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/createuser', function (req, res) {

    var pass = req.body.user.password;

    User.create({
        first_name: req.body.user.first_name,
        last_name: req.body.user.last_name,
        email: req.body.user.email,
        team: req.body.user.team,
        password: bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(user) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 })
            res.json({
                user: user,
                message: 'user created',
                sessionToken: token,
            })
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );

})

router.post('/signin', function (req, res) {
    User.findOne({ where: { email: req.body.user.email } })
        .then(
            function (user) {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                        if (matches) {
                            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 })
                            res.json({
                                user: user,
                                message: "welcome back!",
                                sessionToken: token
                            })
                        } else {
                            res.status(502).send({ error: "Password does not match" })
                        }
                    })
                } else {
                    res.status(500).send({ error: "User not found" })
                }


            },
            function (err) {
                res.status(501).send({ error: "didn't work" });
            })
})


module.exports = router;