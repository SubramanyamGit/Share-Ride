const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.get("/", (req, res) => {
  usersController.getAll(req, (err, response) => {
    if (err) {
      res.status(401).json({
        status: "Failure",
        message: err.error,
      });
    }
    if (response) {
      res.status(200).json({
        status: "Users fetched successfully",
        data: response,
      });
    }
  });
});

module.exports = router;
