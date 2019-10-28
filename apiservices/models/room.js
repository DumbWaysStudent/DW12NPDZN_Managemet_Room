'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    name: DataTypes.STRING
  }, {});
  room.associate = function(models) {
    room.belongsToMany(models.customer, {
      through: models.order,
      foreignKey: 'room_id',
      as: 'customer'
    })
  };
  return room;
};