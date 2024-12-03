const userModel = require("../models/users.model");

 const usersController  = {
  getAll: (req, callback) => {
    try {
      userModel.getAll(req, (err, data) => {
        if (err) {
          return callback(err);
        }
        if (data) {
          return callback(null, data);
        }
      });
    } catch (error) {
      callback(error);
    }
  },
};

module.exports = usersController