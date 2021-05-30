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
        name: DataTypes.STRING,
        dob: DataTypes.DATEONLY,
        age: DataTypes.INTEGER,
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
