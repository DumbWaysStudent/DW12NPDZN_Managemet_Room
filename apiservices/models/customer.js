'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    name: DataTypes.STRING,
    identity_number: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  customer.associate = function(models) {
    customer.belongsToMany(models.room, {
      through: models.order,
      foreignKey: 'customer_id',
      as: 'room'
    })
  };
  return customer;
};