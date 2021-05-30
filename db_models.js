const { DataTypes } = require("sequelize");
class Models {
  #db;
  #primaryKey;
  #models;
  constructor() {
    this.#primaryKey = {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    };
    this.#models = {
      employee: {
        id: this.#primaryKey,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        dob: DataTypes.DATEONLY,
        salary: DataTypes.FLOAT,
        manager: DataTypes.STRING,
        department: DataTypes.STRING,
      },
    };
  }
  getModels() {
    return this.#models;
  }
}
module.exports = Models;
