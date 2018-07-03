
var Sequelize = require('sequelize');

                        
var sequelize = new Sequelize(process.env.DBNAME, process.env.PGUSER, process.env.PGPASS, {
    host: 'localhost', 
    dialect: 'postgres'  
});
             
sequelize.authenticate().then(
    function() { 
        console.log('Connected to races postgres database');
    },
    function(err){ 
        console.log(err);
    }
);
                 
module.exports = sequelize;