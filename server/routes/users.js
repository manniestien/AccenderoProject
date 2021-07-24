var express = require('express');
const sequenceGenerator = require('./sequenceGen');
const User = require('../models/user');
var router = express.Router();

var router = express.Router();

router.get('/', (req, res, next) => {
  User.find()
    .populate('group')
    .then(users => {
      res.status(200).json({
          message: 'Users fetched successfully!',
          Users: users
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});


router.post('/', (req, res, next) => {
    const maxUserId = sequenceGenerator.nextId("Users");

    const user = new User({
      id: maxUserId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imgUrl: req.body.imgUrl,
    });

    user.save()
      .then(createdUser => {
        res.status(201).json({
          message: 'User added successfully',
          user: createdUser
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
});


router.put('/:id', (req, res, next) => {
    User.findOne({ id: req.params.id })
      .then(user => {
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.imgUrl = req.body.imgUrl;

        User.updateOne({ id: req.params.id }, User)
          .then(result => {
            res.status(204).json({
              message: 'User updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'User not found.',
          error: { message: 'User not found'}
        });
      });
});

router.delete("/:id", (req, res, next) => {
    User.findOne({ id: req.params.id })
      .then(user => {
        User.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "User deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'User not found.',
          error: { message: 'User not found'}
        });
      });
});

module.exports = router;
