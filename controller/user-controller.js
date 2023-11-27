const { ObjectId } = require('mongoose').Types;
const { Student, Course } = require('../models');

module.exports = {
  // Get all students
  async getUser(req, res) {
    try {
      const students = await Student.find();

      const studentObj = {
        students,
        headCount: await headCount(),
      };

      res.json(studentObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single student
  async getUserById(req, res) {
    try {
      const student = await Student.findOne({ _id: req.params.id })
        .select('-__v');

      if (!student) {
        return res.status(404).json({ message: 'No student with that ID' })
      }

      res.json({
        student,
        grade: await grade(req.params.id),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new student
  async createUser(req, res) {
    try {
      const student = await Student.create(req.body);
      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    try {
      const student = await Student.findOneAndRemove({ _id: req.params.id });

      if (!student) {
        return res.status(404).json({ message: 'No such student exists' });
      }

      const course = await Course.findOneAndUpdate(
        { students: req.params.id },
        { $pull: { students: req.params.id } },
        { new: true }
      );

      if (!course) {
        return res.status(404).json({
          message: 'Student deleted, but no courses found',
        });
      }

      res.json({ message: 'Student successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to a user
  async addFriend(req, res) {
    try {
      // Assuming the friendId is sent in the request body
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.friends.push(req.body.friendId);
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.friends.pull(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
