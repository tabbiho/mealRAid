module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('raids', 'location_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'locations',
        key: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('raids', 'location_id');
  },
};
