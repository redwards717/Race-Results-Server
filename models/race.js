module.exports = function (sequelize, DataTypes) {
    return sequelize.define('race', {
        race_name: DataTypes.STRING,
        race_type: DataTypes.STRING,
        category: DataTypes.INTEGER,
        starters: DataTypes.INTEGER,
        place: DataTypes.INTEGER,
        date: DataTypes.STRING,
        owner: DataTypes.INTEGER,
        points: DataTypes.INTEGER
    });

};