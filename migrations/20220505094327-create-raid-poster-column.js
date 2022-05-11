module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('raids', 'user_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('raids', 'user_id');
  },
};
