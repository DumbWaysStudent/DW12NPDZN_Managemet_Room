'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkInsert('customers', [
        {
          name: 'Gaara',
          identity_number: 'Suna 1',
          phone_number: '123',
          image: 'https://vignette.wikia.nocookie.net/naruto/images/4/4a/Gaara_p1.png/revision/latest/scale-to-width-down/300?cb=20170913105628',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sasuke',
          identity_number: 'Konoha 2',
          phone_number: '124',
          image: 'https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sakura',
          identity_number: 'Konoha 3',
          phone_number: '125',
          image: 'https://vignette.wikia.nocookie.net/naruto/images/6/64/Sakura_Part_1.png/revision/latest/scale-to-width-down/300?cb=20170726101444',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('customers', null, {});
  
  }
};
