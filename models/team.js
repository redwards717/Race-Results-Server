module.exports = function (sequelize, DataTypes){
    return sequelize.define('team', {
        team_name: DataTypes.STRING,
        rider_first_name: DataTypes.STRING,
        rider_last_name: DataTypes.STRING,
        category: DataTypes.INTEGER,
        riding_style: DataTypes.STRING,
        tenure: DataTypes.INTEGER
    })
}