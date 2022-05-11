module.exports = {
  up: async (queryInterface) => {
    const allergens = [
      {
        allergen: 'Dairy',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        allergen: 'Gluten',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        allergen: 'Eggs',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        allergen: 'Peanuts',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        allergen: 'Soy',
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        allergen: 'Seafood',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    await queryInterface.bulkInsert('allergens', allergens);
  },

  down: async (queryInterface) => {
    await queryInterface('allergens', null, {});
  },
};
