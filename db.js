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
  async defineModels() {
    let models = new Models(this.#connector);
    models = models.getModels();
    const Department = this.#connector.define("department", models.department, {
      tableName: "department",
    });
    const Details = this.#connector.define("details", models.details, {
      tableName: "details",
    });
    const Manager = this.#connector.define("manager", models.employee, {
      tableName: "manager",
    });
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
  async _create(modelName, value) {
    const set = await this.#connector.models[modelName].create(value);
    return JSON.parse(JSON.stringify(set, null, 2));
  }
  async _delete(modelName, conditionals) {
    return this.#connector.models[modelName].destroy(conditionals);
  }
  _query(modelName, columns, conditionals) {
    if (typeof conditionals == "undefined")
      return this.#connector.models[modelName].findAll({
        attributes: columns,
      });
    else
      return this.#connector.models[modelName].findAll({
        attributes: columns,
        where: conditionals,
      });
  }
}

module.exports = DB;
