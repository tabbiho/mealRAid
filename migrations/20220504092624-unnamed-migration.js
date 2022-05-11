module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('raids', 'best_by', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('raids', 'best_by');
  },
};
