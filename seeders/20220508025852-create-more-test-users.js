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
      email: 'test3@company.com',
      password: getHash(`test3-${SALT}`),
      name: 'Xiao Ling',
      designation: 'Officer',
      division: 'Information Technology',
      system: false,
      post_rights: false,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      email: 'test4@company.com',
      password: getHash(`test4-${SALT}`),
      name: 'Hamid',
      designation: 'Supervisor',
      division: 'Learning & Development',
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
