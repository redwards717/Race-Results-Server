require('dotenv').config();

var express = require('express');
var app = express();
var user = require('./controllers/usercontroller')
var race = require('./controllers/racecontroller')
var team = require('./controllers/teamcontroller')
var auth = require('./controllers/authusercontroller')
var sequelize = require('./db')
var bodyParser = require('body-parser');

sequelize.sync();

app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/race', user);
app.use('/team', team);
app.use(require('./middleware/validate-session'))

app.use('/race', auth);
app.use('/race', race);

app.listen(process.env.PORT, function(){
    console.log(`app is listening on ${process.env.PORT}`);
})