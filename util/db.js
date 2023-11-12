const Sequelize = require('sequelize');
const {Umzug, SequelizeStorage} = require('umzug');
const {DATABASE_URL} = require('./config');

const sequelize = new Sequelize(DATABASE_URL);

const migrationConfig = {
  migrations: {
    glob: 'migrations/*js',
  },
  storage: new SequelizeStorage({
    sequelize,
    tableName: 'migrations',
  }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigrations = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  const migrations = await migrator.down();
  console.log('Migrations rolled back', {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await runMigrations();
    console.log('database connected');
  } catch (err) {
    console.log('connecting database failed');
    console.log(err);
    return process.exit(1);
  }
  return null;
};

module.exports = {sequelize, rollbackMigrations, connectToDatabase};
