
var Sequelize = require('sequelize');

                        
var sequelize = new Sequelize('races', 'postgres', 'viranque1', {
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