const jsSHA = require('jssha');

const getHash = (str) => {
  // eslint-disable-next-line new-cap
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(str);
  const hash = shaObj.getHash('HEX');
  return hash;
};

const SALT = 'meal';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      email: 'system@company.com',
      password: getHash(`system-${SALT}`),
      name: 'System',
      designation: 'System',
      division: 'System',
      system: true,
      post_rights: false,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
