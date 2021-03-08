const Sequelize = require('sequelize');

// Remember to create the db first (run createdb <dbName>)
const database = new Sequelize({
  database: 'reddit-users',
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op
});

const Users = database.define('users', {
  id: { type: Sequelize.STRING, primaryKey: true },
  first_name: { type: Sequelize.STRING, allowNull: false },
  last_name: { type: Sequelize.STRING, allowNull: false },
  sub_reddits: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false, defaultValue: [] },
  email_enabled: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
  email_time: { type: Sequelize.STRING, allowNull: false, defaultValue: '08:00' }
});

module.exports = {
  Users,
  database
}