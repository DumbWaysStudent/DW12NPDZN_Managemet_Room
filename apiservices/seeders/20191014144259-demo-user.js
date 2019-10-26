'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
          email: 'sanji@gmail.com',
          password: 'xxx',
          username: 'sanji',
          image: 'https://vignette.wikia.nocookie.net/onepiece/images/b/b6/Sanji_Anime_Post_Timeskip_Infobox.png/revision/latest/scale-to-width-down/270?cb=20170625125657',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        
    ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('users', null, {});
    
  }
};