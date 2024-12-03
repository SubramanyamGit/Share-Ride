const sql = require("./server");
const bcrypt = require("bcrypt");

module.exports = {
  signUp: (data, callback) => {
    try {
      let { full_name, password, email, user_role } = data.body;
      const query =
        "insert into users(full_name,password,email,user_role) values(?,?,?,?)";
      password = bcrypt.hashSync(password, 10);
      sql.query(query, [full_name, password, email, user_role], (err, data) => {
        if (err) {
          callback(err);
        }
        if (data) {
          callback(null, { message: "Sign Up Successful" });
        }
      });
    } catch (error) {
      callback(error);
    }
  },
};
