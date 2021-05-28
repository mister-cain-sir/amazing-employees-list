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
      department: {
        id: this.#primaryKey,
        name: DataTypes.STRING,
      },
      details: {
        id: this.#primaryKey,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        dob: DataTypes.DATEONLY,
        salary: DataTypes.FLOAT,
        department: {
          type: DataTypes.INTEGER,
          // allowNull: false,
          references: {
            model: "department",
            key: "id",
          },
        },
      },
      employee: {
        id: this.#primaryKey,
        details: {
          type: DataTypes.INTEGER,
          references: {
            model: "details",
            key: "id",
          },
        },
        reporting_manager: {
          type: DataTypes.INTEGER,
          references: {
            model: "manager",
            key: "id",
          },
        },
      },
      manager: {
        id: this.#primaryKey,
        manager_details: {
          type: DataTypes.INTEGER,
          references: {
            model: "details",
            key: "id",
          },
        },
      },
    };
  }
  getModels() {
    return this.#models;
  }
}
module.exports = Models;
