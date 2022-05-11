module.exports = {
  up: async (queryInterface) => {
    const locations = [
      {
        location: 'B1 Staff Canteen',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        location: 'B1 Carpark',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        location: 'L1 Atrium Foyer',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        location: 'Forensics Lab',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        location: 'The Grand Ballroom',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        location: 'L1 Meeting Room 1',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        location: 'L1 Meeting Room 2',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        location: 'L2 Function Room 1',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        location: 'L2 Function Room 2',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('locations', locations);
  },

  down: async (queryInterface) => {
    await queryInterface('locations', null, {});
  },
};
