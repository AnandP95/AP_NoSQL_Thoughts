const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought by id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      if (!thought) {


        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {

      res.status(500).json(err);
    }
  },


  // Create a new thought 
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
     
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.thoughts.push(newThought._id);
      await user.save();
      res.status(201).json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  


  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: req.params.id });
      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with this ID' });
      }
     
      const user = await User.findOne({ thoughts: req.params.id });
      if (user) {
        user.thoughts.pull(req.params.id);
        await user.save();
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thoughts
 
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this ID' });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Add a reaction to a thought
async addReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID' });
      }
      thought.reactions.push(req.body);
      const updatedThought = await thought.save();
      res.status(201).json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a reaction from a thought
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID' });
      }
      thought.reactions = thought.reactions.filter(
        (reaction) => reaction._id.toString() !== req.params.reactionId
      );
      const updatedThought = await thought.save();
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
};