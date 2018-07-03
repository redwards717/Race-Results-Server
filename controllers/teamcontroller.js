var express = require('express');
var router = require('express').Router();
var sequelize = require('../db');
var Team = sequelize.import('../models/team');

router.post('/:team', function (req, res) {

    Team.create({
        team_name: req.params.team,
        rider_first_name: req.body.team.rider_first_name,
        rider_last_name: req.body.team.rider_last_name,
        category: req.body.team.category,
        riding_style: req.body.team.riding_style,
        tenure: req.body.team.tenure,
    }).then(
        function createSuccess(team) {
            res.json({
                team: team,
                message: 'rider data has been added to the database'
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})

router.get('/:team', function (req, res) {
    Team.findAll({
        where: { team_name: req.params.team }
    }).then(
        function (team) {
            res.json({
                team: team
            })
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})

router.delete('/del', function (req, res) {
    var rider = req.body.team.id;

    Team.destroy({
        where: { id: rider }
    }).then(
        function deleteLogSuccess(data) {
            res.send("you removed a rider")
        },
        function deleteLogError(err) {
            res.send(500, err.message);
        }
    )
})

router.put('/update', function (req, res) {
    var data = req.body.team.id;
    Team.update({
        rider_first_name: req.body.team.rider_first_name,
        rider_last_name: req.body.team.rider_last_name,
        category: req.body.team.category,
        riding_style: req.body.team.riding_style,
        tenure: req.body.team.tenure,
    },
        { where: { id: data } }
    ).then(
        function updateSuccess() {
            res.json({
                rider_first_name: req.body.team.rider_first_name,
                rider_last_name: req.body.team.rider_last_name,
                category: req.body.team.category,
                riding_style: req.body.team.riding_style,
                tenure: req.body.team.tenure,
                message: 'rider info has been updated'
            });
        },
        function updateError(err) {
            res.send(500, err.message);
        }
    )
})


module.exports = router;