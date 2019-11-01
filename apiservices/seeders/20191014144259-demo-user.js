'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
          email: 'naruto@gmail.com',
          password: 'xxx',
          username: 'Naruto',
          image: 'https://vignette.wikia.nocookie.net/naruto/images/0/08/Naruto_part_III.png/revision/latest/scale-to-width-down/300?cb=20190225042909',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('users', null, {});
    
  }
};