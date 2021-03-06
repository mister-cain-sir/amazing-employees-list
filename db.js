const { Sequelize, Op } = require("sequelize"),
  config = require("./config.json"),
  Models = require("./db_models");
let sequelize;
class DB {
  #connector;
  #models;
  constructor() {
    this.#models = [];
  }
  async init() {
    this.#connector = new Sequelize(
      "",
      config.database.username,
      config.database.password,
      {
        host: config.database.host,
        dialect: config.database.dialect,
        logging: false,
      }
    );
    sequelize = this.#connector;
    return await this.initDB();
  }
  async initDB() {
    await this.connect();
    await this.#connector.query(
      "CREATE DATABASE IF NOT EXISTS " + config.database.database_name + ";"
    );
    await this.disconnect();
    this.#connector = new Sequelize(
      config.database.database_name,
      config.database.username,
      config.database.password,
      {
        host: config.database.host,
        dialect: config.database.dialect,
        logging: false,
      }
    );
    return this.defineModels();
  }
  async dropDatabase() {
    await this.#connector.query(
      "DROP DATABASE " + config.database.database_name + ";"
    );
    await this.disconnect();
    await this.init();
  }
  async defineModels() {
    let models = new Models(this.#connector);
    models = models.getModels();
    const Employee = this.#connector.define("employee", models.employee, {
      tableName: "employee",
    });

    return this.#connector.sync();
  }
  connect() {
    return this.#connector.authenticate();
  }
  disconnect() {
    return this.#connector.close();
  }
  async _createOrFind(modelName, value) {
    const set = await this.#connector.models[modelName].findOrCreate({
      where: value,
      defaults: value,
    });
    return JSON.parse(JSON.stringify(set, null, 2));
  }
  async _create(modelName, value) {
    const set = await this.#connector.models[modelName].create(value);
    return JSON.parse(JSON.stringify(set, null, 2));
  }
  async _delete(modelName, conditionals) {
    return this.#connector.models[modelName].destroy(conditionals);
  }
  _query(modelName, config, search) {
    // console.log(search);
    if (search) {
      // console.log(config);
      // return {};
      let where = {};
      for (const columnName in config.where) {
        if (Object.hasOwnProperty.call(config.where, columnName)) {
          const query = config.where[columnName];
          where[columnName] = sequelize.where(
            sequelize.fn("LOWER", sequelize.col(columnName)),
            "LIKE",
            "%" + query + "%"
          );
        }
      }
      config.where = where;
    }
    // console.log(config);
    return this.#connector.models[modelName].findAndCountAll(config);
  }
}

module.exports = DB;
