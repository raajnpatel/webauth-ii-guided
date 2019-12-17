const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res
          .status(200)
          .json(users);
    })
    .catch(error => {
        console.log(error);
        res
            .status(500)
            .send(error)
    });
});

module.exports = router;
