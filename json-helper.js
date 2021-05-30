class JSONHelper {
  db;
  constructor(db) {
    this.db = db;
  }
  async fetchEmployeeRecord(conf) {
    let config = {
      attributes: [
        "first_name",
        "last_name",
        "dob",
        "salary",
        "manager",
        "department",
      ],
      order: [
        ["first_name", "asc"],
        ["last_name", "asc"],
      ],
    };
    if (conf != undefined) {
      if (conf.conditionals != undefined) config.where = conf.conditionals;
      if (conf.limit != undefined) config.limit = conf.limit;
      if (conf.offset != undefined) config.offset = conf.offset;
      if (conf.order != undefined) config.order = conf.order;
    }
    let employees = await this.db._query("employee", config);
    // for (let i = 0; i < employees.length; i++) {
    //   const record = employees[i];
    //   let departmentRecord = await this.db._query("department", {
    //     attributes: ["name"],
    //     where: {
    //       id: record.department,
    //     },
    //   });
    //   record.department = departmentRecord[0].dataValues.name;
    // }
    return employees;
  }
}

module.exports = JSONHelper;
