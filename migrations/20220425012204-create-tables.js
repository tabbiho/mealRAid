module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.TEXT,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      designation: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      division: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      system: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      post_rights: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      location: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('raids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      pax: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'locations',
          key: 'id',
        },
      },
      detail: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('raid_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      raid_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'raids',
          key: 'id',
        },
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('allergens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      allergen: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('raid_allergens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      raid_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'raids',
          key: 'id',
        },
      },
      allergen_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'allergens',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('raid_allergens');
    await queryInterface.dropTable('allergens');
    await queryInterface.dropTable('raid_users');
    await queryInterface.dropTable('raids');
    await queryInterface.dropTable('locations');
    await queryInterface.dropTable('users');
  },
};
