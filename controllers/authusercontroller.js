var express = require('express');
var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



router.get('/user', function (req, res){
    User.findOne({
        where: { id: req.user.id }
    })
        .then(
            function (user) {
                res.json({
                    user: user
                })
            },
            function () {
                res.send(500, err.message);
            }
        )
})
module.exports = router;