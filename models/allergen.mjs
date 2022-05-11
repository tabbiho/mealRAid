export default function allergenModel(sequelize, DataTypes) {
  return sequelize.define('allergen', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    allergen: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
