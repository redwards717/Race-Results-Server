
var Sequelize = require('sequelize');

                        
var sequelize = new Sequelize(process.env.DBNAME, process.env.PGUSER, process.env.PGPASS, {
    port: 5432, 
    dialect: 'postgres',
    host: process.env.PGHOST  
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