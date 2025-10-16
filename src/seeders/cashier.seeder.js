'use strict';

const { hashPassword } = require('./../lib/hashPassword');

module.exports = {
  up: async (queryInterface) => {
    const password1 = await hashPassword('password123');
    const password2 = await hashPassword('secret456');

    await queryInterface.bulkInsert('Cashier', [
      {
        uuid: 'uuid-1',
        username: 'kasir1',
        email: 'kasir1@example.com',
        password: password1,
        status: 'active',
        image_profile: 'profile1.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        uuid: 'uuid-2',
        username: 'kasir2',
        email: 'kasir2@example.com',
        password: password2,
        status: 'nonactive',
        image_profile: 'profile2.png',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Cashier', null, {});
  }
};
