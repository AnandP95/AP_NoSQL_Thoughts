const router = require('express').Router();



//GET to get all thoughts

//GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller.js');


router.route('/').get(getAllThoughts).post(createThought);


router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);


  router.route("/:thoughtId/reactions").post(addReaction);


router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;