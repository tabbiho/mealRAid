export default function userModel(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    designation: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    division: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    system: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    postRights: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { underscored: true });
}
