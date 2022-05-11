import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import allergenModel from './allergen.mjs';
import locationModel from './location.mjs';
import raidModel from './raid.mjs';
import userModel from './user.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Allergen = allergenModel(sequelize, Sequelize.DataTypes);
db.Location = locationModel(sequelize, Sequelize.DataTypes);
db.Raid = raidModel(sequelize, Sequelize.DataTypes);
db.User = userModel(sequelize, Sequelize.DataTypes);

db.User.belongsToMany(db.Raid, { through: 'raid_users' });
db.Raid.belongsToMany(db.User, { through: 'raid_users' });

db.Allergen.belongsToMany(db.Raid, { through: 'raid_allergens' });
db.Raid.belongsToMany(db.Allergen, { through: 'raid_allergens' });

db.Raid.belongsTo(db.Location);
db.Location.hasMany(db.Raid);

db.Raid.belongsTo(db.User);
db.User.hasMany(db.Raid);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
