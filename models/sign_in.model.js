const sql = require("./server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signIn: (data, callback) => {
    try {
      const { email, password: InputPassword } = data.body;
      const query = "select user_id,password,full_name from users where email=?";
      sql.query(query, [email], (err, data) => {
        if (err) {
          callback(err);
        }
        if (data && data.length) {
          const { password, user_id,full_name } = data[0];
          const isPasswordCrt = bcrypt.compareSync(InputPassword, password);
          if (!isPasswordCrt) {
            callback(null, { message: "Email and Password doesn't match" });
          }
          if (isPasswordCrt) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ user_id,full_name }, jwtSecretKey);
            callback(null, { token });
          }
        } else {
          callback({ message: "Invalid Email and Password" });
        }
      });
    } catch (error) {
      callback(error);
    }
  },
};
