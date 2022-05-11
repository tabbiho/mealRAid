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
      email: 'test1@company.com',
      password: getHash(`test1-${SALT}`),
      name: 'Jeremy',
      designation: 'Executive',
      division: 'Sales & Marketing',
      system: false,
      post_rights: true,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      email: 'test2@company.com',
      password: getHash(`test2-${SALT}`),
      name: 'Patricia',
      designation: 'Director',
      division: 'Food & Beverage',
      system: false,
      post_rights: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
