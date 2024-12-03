const jwt = require("jsonwebtoken");
const db = require("./server");

const ridesModel = {
  postRide: (data, callback) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = data.header("authorization").split(" ");
    const verified = jwt.verify(token[1], jwtSecretKey);
    const created_by = verified.user_id;
    const full_name = verified.full_name;
    try {
      const {
        from_place,
        to_place,
        pick_up_location,
        drop_location,
        price,
        car_type,
        no_of_seats_avlb,
        mobile_no,
        travel_date,
        travel_time,
      } = data.body;
      const query =
        "insert into rides(created_by,from_place,to_place,pick_up_location,drop_location,price,car_type,no_of_seats_avlb,mobile_no,full_name,travel_date,travel_time) values(?,?,?,?,?,?,?,?,?,?,?,?);";
      db.query(
        query,
        [
          created_by,
          from_place,
          to_place,
          pick_up_location,
          drop_location,
          price,
          car_type,
          no_of_seats_avlb,
          mobile_no,
          full_name,
          travel_date,
          travel_time,
        ],
        (err, data) => {
          if (err) {
            callback(err);
          }
          if (data) {
            callback(null, data);
          }
        }
      );
    } catch (error) {
      callback(error);
    }
  },
  getAllRides: (data, callback) => {
    try {
      db.query("select * from rides;", (err, data) => {
        if (err) {
          callback(err);
        }
        if (data) {
          callback(null, data);
        }
      });
    } catch (error) {
      callback(error);
    }
  },
  getMyRides: (data, callback) => {
    try {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const token = data.header("authorization").split(" ");
      const verified = jwt.verify(token[1], jwtSecretKey);
      const created_by = verified.user_id;
      db.query(
        "select * from rides where created_by = ?;",
        [created_by],
        (err, data) => {
          if (err) {
            callback(err);
          }
          if (data) {
            callback(null, data);
          }
        }
      );
    } catch (error) {
      callback(error);
    }
  },
  updateRide: (data, callback) => {
    try {
      const { ride_id } = data.body;
      const keysCanUpdate = [
        "pick_up_location",
        "drop_location",
        "no_of_seats_avlb",
        "ride_id",
      ];
      const keysForUpdate = Object.keys(data.body);
      let invalidFileds = false;
      keysForUpdate.forEach((key) => {
        if (!keysCanUpdate.includes(key) && !invalidFileds) {
          invalidFileds = true;
        }
      });
      if (invalidFileds) {
        return callback({ message: "Invalid Fileds to update" });
      }
      const query = `update rides set ${keysForUpdate
        .map((key) => `${key}=?`)
        .join(", ")} where ride_id =?`;
      db.query(query, [...Object.values(data.body), ride_id], (err, data) => {
        if (err) {
          callback(err);
        }
        if (data) {
          callback(null, data);
        }
      });
    } catch (error) {
      callback(error);
    }
  },
  deleteRide: (data, callback) => {
    const {ride_id} = data.params
    const query = "delete from rides where ride_id=?;"
    try {
      db.query(query,[ride_id], (err, data) => {
        if (err) {
          callback(err);
        }
        if (data) {
          callback(null, data);
        }
      });
    } catch (error) {
      callback(error);
    }
  }
};

module.exports = ridesModel;
