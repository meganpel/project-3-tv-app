module.exports = function(sequelize, DataTypes) {
  return sequelize.define("UserShow", {
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER
  });
};