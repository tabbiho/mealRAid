export default function raidModel(sequelize, DataTypes) {
  return sequelize.define('raid', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    pax: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    locationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'locations',
        key: 'id',
      },
    },
    detail: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    image: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    bestBy: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }, { underscored: true });
}
