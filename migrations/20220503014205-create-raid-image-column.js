module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('raids', 'image', {
      allowNull: false,
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('raids', 'image');
  },
};
