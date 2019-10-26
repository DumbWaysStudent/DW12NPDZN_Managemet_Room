'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkInsert('customers', [
        {
          name: 'Naruto',
          identity_number: 'K1',
          phone_number: '123',
          image: '',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sasuke',
          identity_number: 'K2',
          phone_number: '124',
          image: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('customers', null, {});
  
  }
};
