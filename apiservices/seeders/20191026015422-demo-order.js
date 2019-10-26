'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('orders', [
        {
          room_id: 1,
          customer_id: 1,
          is_done: false,
          is_booked: false,
          duration: 10,
          order_end_time: new Date(), 
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('orders', null, {});
  
  }
};
