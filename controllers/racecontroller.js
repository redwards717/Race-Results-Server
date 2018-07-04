var express = require('express');
var router = require('express').Router();
var sequelize = require('../db');
var Race = sequelize.import('../models/race');


router.post('/', function (req, res) {
    var start = Number(req.body.race.starters);
    var fin = Number(req.body.race.place);
    var type = req.body.race.race_type;
    var added;

    if (type == 'Criterium') {
        if (start >= 50) {
            switch (fin) {
                case 1:
                    added = 7
                    break;
                case 2:
                    added = 6
                    break;
                case 3:
                    added = 5
                    break;
                case 4:
                    added = 4
                    break;
                case 5:
                    added = 3
                    break;
                case 6:
                    added = 2
                    break;
                case 7:
                    added = 1
                    break;
                default:
                    added = 0
            }
        } else if (start >= 21) {
            switch (fin) {
                case 1:
                    added = 5
                    break;
                case 2:
                    added = 4
                    break;
                case 3:
                    added = 3
                    break;
                case 4:
                    added = 2
                    break;
                case 5:
                    added = 1
                    break;
                default:
                    added = 0
            }
        } else if (start >= 11) {
            switch (fin) {
                case 1:
                    added = 4
                    break;
                case 2:
                    added = 3
                    break;
                case 3:
                    added = 2
                    break;
                case 4:
                    added = 1
                    break;
                default:
                    added = 0
            }
        } else if (start >= 5) {
            switch (fin) {
                case 1:
                    added = 3
                    break;
                case 2:
                    added = 2
                    break;
                case 3:
                    added = 1
                    break;
                case 4:
                default:
                    added = 0
            }
        } else {
            added = 0
        }
    } else if (type == 'Road Race') {
        if (start >= 50) {
            if (fin == 1) {
                added = 10
            } else{
                added = 10 - fin;
                if (added < 0) {
                    added = 0;
                }
            }
        } else if (start >= 21) {
            if (fin == 1) {
                added = 8
            } else {
                added = 8 - fin;
                if (added < 0) {
                    added = 0;
                }
            }
        } else if (start >= 11) {
            if (fin == 1) {
                added = 7
            } else {
                added = 7 - fin;
                if (added < 0) {
                    added = 0;
                }
            }
        } else if (start >= 5) {
            added = 4 - fin;
            if (added < 0) {
                added = 0;
            }
        } else {
            return;
        }
    } else if (type == 'Time Trial') {
        added = 0
    }


    Race.create({
        race_name: req.body.race.race_name,
        race_type: req.body.race.race_type,
        category: req.body.race.category,
        starters: req.body.race.starters,
        place: req.body.race.place,
        date: req.body.race.date,
        owner: req.user.id,
        points: added
    }).then(
        function createSuccess(race) {
            res.json({
                race: race,
                message: 'race info has been added to the database'
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.get('/', function (req, res) {
    Race.findAll({
        where: { owner: req.user.id }
    })
        .then(
            function (race) {
                res.json({
                    race: race
                })
            },
            function () {
                res.send(500, err.message);
            })
})

router.get('/find/:id', function (req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    Race.findOne({
        where: { id: data, owner: userid }
    })
        .then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        )
})

router.put('/update', function (req, res) {
    var data = req.body.race.id;

    var start = Number(req.body.race.starters);
    var fin = Number(req.body.race.place);
    var type = req.body.race.race_type;
    var added;

    if (type == 'Criterium') {
        if (start >= 50) {
            switch (fin) {
                case 1:
                    added = 7
                    break;
                case 2:
                    added = 6
                    break;
                case 3:
                    added = 5
                    break;
                case 4:
                    added = 4
                    break;
                case 5:
                    added = 3
                    break;
                case 6:
                    added = 2
                    break;
                case 7:
                    added = 1
                    break;
                default:
                    added = 0
            }
        } else if (start >= 21) {
            switch (fin) {
                case 1:
                    added = 5
                    break;
                case 2:
                    added = 4
                    break;
                case 3:
                    added = 3
                    break;
                case 4:
                    added = 2
                    break;
                case 5:
                    added = 1
                    break;
                default:
                    added = 0
            }
        } else if (start >= 11) {
            switch (fin) {
                case 1:
                    added = 4
                    break;
                case 2:
                    added = 3
                    break;
                case 3:
                    added = 2
                    break;
                case 4:
                    added = 1
                    break;
                default:
                    added = 0
            }
        } else if (start >= 5) {
            switch (fin) {
                case 1:
                    added = 3
                    break;
                case 2:
                    added = 2
                    break;
                case 3:
                    added = 1
                    break;
                case 4:
                default:
                    added = 0
            }
        } else {
            added = 0
        }
    } else if (type == 'Road Race') {
        if (start >= 50) {
            if (fin == 1) {
                added = 10
            } else{
                added = 10 - fin;
                if (added < 0) {
                    added = 0;
                }
            }
        } else if (start >= 21) {
            if (fin == 1) {
                added = 8
            } else {
                added = 8 - fin;
                if (added < 0) {
                    added = 0;
                }
            }
        } else if (start >= 11) {
            if (fin == 1) {
                added = 7
            } else {
                added = 7 - fin;
                if (added < 0) {
                    added = 0;
                }
            }
        } else if (start >= 5) {
            added = 4 - fin;
            if (added < 0) {
                added = 0;
            }
        } else {
            return;
        }
    } else if (type == 'Time Trial') {
        added = 0
    }

    
    Race.update({
        race_name: req.body.race.race_name,
        race_type: req.body.race.race_type,
        category: req.body.race.category,
        starters: req.body.race.starters,
        place: req.body.race.place,
        date: req.body.race.date,
        points: added
    },
        { where: { id: data } }
    ).then(
        function updateSuccess() {
            res.json({
                race_name: req.body.race.race_name,
                race_type: req.body.race.race_type,
                category: req.body.race.category,
                starters: req.body.race.starters,
                place: req.body.race.place,
                date: req.body.race.date,
                points: added,
                message: 'race info has been updated'
            });
        },
        function updateError(err) {
            res.send(500, err.message);
        }
    )
})

router.delete('/', function (req, res) {
    var userid = req.body.race.id;

    Race.destroy({
        where: { id: userid }
    }).then(
        function deleteLogSuccess(data) {
            res.send("you removed a race");
        },
        function deleteLogError(err) {
            res.send(500, err.message);
        }
    );
})





module.exports = router;