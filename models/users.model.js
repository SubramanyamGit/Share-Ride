const sql = require('./server');

module.exports = {
    getAll: (data, callback) => {
    try {
      sql.query(
        "select full_name,email,user_role from users;",
        (err, data) => {
          if (err) {
            callback(err);
          }
         if(data){
            callback(null,data)
         }
        }
      );
    } catch (error) {
      callback(error);
    }
  },
};
