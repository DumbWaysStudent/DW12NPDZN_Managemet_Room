'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    room_id: DataTypes.STRING,
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE
  }, {});
  order.associate = function(models) {
    order.belongsTo(models.room,{
      foreignKey: 'room_id',
      as: 'roomId'
    }),
    order.belongsTo(models.customer,{
      foreignKey: 'customer_id',
      as: 'customerId'
    })
    
  };
  return order;
};