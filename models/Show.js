module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Show", {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT
  });
};